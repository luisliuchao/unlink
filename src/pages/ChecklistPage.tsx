import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Check,
  Download,
  ExternalLink,
  EyeOff,
  Link as LinkIcon,
  Plus,
  RotateCcw,
  Trash2,
  Upload
} from 'lucide-react';
import { Checklist, Step } from '../data/types';
import {
  Customization,
  CustomStep,
  clearCustomization,
  decodeCustomization,
  emptyCustomization,
  encodeCustomization,
  hasCustomization,
  isCustomization,
  loadCustomization,
  saveCustomization
} from '../lib/customize';
import { siteUrl } from '../pageMeta';

type ChecklistPageProps = {
  checklist: Checklist;
};

type TickState = Record<string, boolean>;

const tickStorageKey = (slug: string): string => {
  return `unlink-sg:${slug}`;
};

const loadTicks = (slug: string): TickState => {
  try {
    const raw = window.localStorage.getItem(tickStorageKey(slug));
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed as TickState;
      }
    }
  } catch {
    // corrupted or unavailable storage — start fresh
  }
  return {};
};

const parseSharedFromHash = (): Customization | null => {
  const match = /[#&]c=([A-Za-z0-9_-]+)/.exec(window.location.hash);
  if (match) {
    return decodeCustomization(match[1]);
  }
  return null;
};

type AddStepFormProps = {
  onAdd: (title: string, detail: string) => void;
  onCancel: () => void;
};

function AddStepForm({ onAdd, onCancel }: AddStepFormProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  return (
    <div className="rounded-lg border border-dashed border-emerald-300 bg-emerald-50/40 p-4 space-y-2">
      <input
        type="text"
        value={title}
        maxLength={200}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        placeholder="Step title, e.g. Update my building access app"
        className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-emerald-500 focus:outline-none"
      />
      <textarea
        value={detail}
        maxLength={1000}
        onChange={(event) => {
          setDetail(event.target.value);
        }}
        placeholder="Details (optional)"
        rows={2}
        className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-emerald-500 focus:outline-none"
      />
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (title.trim()) {
              onAdd(title.trim(), detail.trim());
            }
          }}
          disabled={!title.trim()}
          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          Add step
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function ChecklistPage({ checklist }: ChecklistPageProps): JSX.Element {
  const [ticks, setTicks] = useState<TickState>({});
  const [customization, setCustomization] = useState<Customization>(emptyCustomization);
  const [loaded, setLoaded] = useState(false);
  const [incoming, setIncoming] = useState<Customization | null>(null);
  const [addingPhase, setAddingPhase] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTicks(loadTicks(checklist.slug));
    setCustomization(loadCustomization(checklist.slug));
    setIncoming(parseSharedFromHash());
    setLoaded(true);
  }, [checklist.slug]);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(tickStorageKey(checklist.slug), JSON.stringify(ticks));
    }
  }, [checklist.slug, ticks, loaded]);

  useEffect(() => {
    if (loaded) {
      if (hasCustomization(customization)) {
        saveCustomization(checklist.slug, customization);
      } else {
        clearCustomization(checklist.slug);
      }
    }
  }, [checklist.slug, customization, loaded]);

  const hiddenSet = useMemo(() => {
    return new Set(customization.hidden);
  }, [customization]);

  const visibleStepIds = useMemo(() => {
    const defaults = checklist.phases.flatMap((phase) => {
      return phase.steps.filter((step) => !hiddenSet.has(step.id)).map((step) => step.id);
    });
    const customs = customization.custom.map((step) => step.id);
    return [...defaults, ...customs];
  }, [checklist, hiddenSet, customization]);

  const doneCount = visibleStepIds.filter((id) => ticks[id]).length;
  const customized = hasCustomization(customization);

  const toggle = (id: string): void => {
    setTicks((prev) => {
      return { ...prev, [id]: !prev[id] };
    });
  };

  const hideStep = (id: string): void => {
    setCustomization((prev) => {
      return { ...prev, hidden: [...prev.hidden, id] };
    });
  };

  const restorePhase = (phaseId: string): void => {
    const phase = checklist.phases.find((p) => p.id === phaseId);
    if (phase) {
      const phaseStepIds = new Set(phase.steps.map((step) => step.id));
      setCustomization((prev) => {
        return { ...prev, hidden: prev.hidden.filter((id) => !phaseStepIds.has(id)) };
      });
    }
  };

  const addCustomStep = (phaseId: string, title: string, detail: string): void => {
    const step: CustomStep = {
      id: `custom-${Date.now().toString(36)}`,
      phaseId,
      title,
      detail
    };
    setCustomization((prev) => {
      return { ...prev, custom: [...prev.custom, step] };
    });
    setAddingPhase(null);
  };

  const deleteCustomStep = (id: string): void => {
    setCustomization((prev) => {
      return { ...prev, custom: prev.custom.filter((step) => step.id !== id) };
    });
  };

  const resetCustomization = (): void => {
    setCustomization(emptyCustomization);
  };

  const shareUrl = (): string => {
    return `${siteUrl}/${checklist.slug}#c=${encodeCustomization(customization)}`;
  };

  const copyShareLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(shareUrl());
    setShareCopied(true);
    window.setTimeout(() => {
      setShareCopied(false);
    }, 2000);
  };

  const exportJson = (): void => {
    const blob = new Blob([JSON.stringify(customization, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `unlink-${checklist.slug}-checklist.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file: File): void => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed: unknown = JSON.parse(String(reader.result));
        if (isCustomization(parsed)) {
          setCustomization(parsed);
        }
      } catch {
        // invalid file — ignore
      }
    };
    reader.readAsText(file);
  };

  const applyIncoming = (): void => {
    if (incoming) {
      setCustomization(incoming);
      setIncoming(null);
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const dismissIncoming = (): void => {
    setIncoming(null);
    window.history.replaceState(null, '', window.location.pathname);
  };

  const toolButton =
    'inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 hover:border-emerald-400 hover:text-emerald-700 transition disabled:opacity-40 disabled:pointer-events-none';

  return (
    <div className="space-y-8">
      {incoming ? (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 space-y-2">
          <p className="font-semibold">
            Someone shared a customised version of this checklist with you
          </p>
          <p>
            {incoming.hidden.length} hidden and {incoming.custom.length} added step(s). Applying
            replaces any customisation of your own on this page.
          </p>
          <div className="flex gap-2">
            <button
              onClick={applyIncoming}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 font-medium text-white hover:bg-emerald-700"
            >
              Apply
            </button>
            <button onClick={dismissIncoming} className="px-3 py-1.5 hover:text-emerald-950">
              Dismiss
            </button>
          </div>
        </div>
      ) : null}

      <header className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">{checklist.title}</h1>
        <p className="text-emerald-700 font-medium">{checklist.tagline}</p>
        <p className="text-slate-600 leading-relaxed">{checklist.intro}</p>
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{checklist.keyRule}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>
            {doneCount} of {visibleStepIds.length} done
            {customized ? ' · customised' : ''}
          </span>
          <span className="flex gap-2">
            <button
              onClick={() => {
                void copyShareLink();
              }}
              disabled={!customized}
              className={toolButton}
              title="Copy a link that carries your customisation"
            >
              {shareCopied ? <Check className="h-3.5 w-3.5" /> : <LinkIcon className="h-3.5 w-3.5" />}
              {shareCopied ? 'Copied' : 'Share my version'}
            </button>
            <button onClick={exportJson} disabled={!customized} className={toolButton}>
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
            <button
              onClick={() => {
                if (importInputRef.current) {
                  importInputRef.current.click();
                }
              }}
              className={toolButton}
            >
              <Upload className="h-3.5 w-3.5" />
              Import
            </button>
            <button
              onClick={resetCustomization}
              disabled={!customized}
              className={toolButton}
              title="Remove your hidden and added steps"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </span>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files && event.target.files[0];
              if (file) {
                importJson(file);
              }
              event.target.value = '';
            }}
          />
        </div>
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{
              width: `${visibleStepIds.length ? (doneCount / visibleStepIds.length) * 100 : 0}%`
            }}
          />
        </div>
      </header>

      {checklist.phases.map((phase, phaseIndex) => {
        const visibleSteps = phase.steps.filter((step) => !hiddenSet.has(step.id));
        const hiddenCount = phase.steps.length - visibleSteps.length;
        const customSteps = customization.custom.filter((step) => step.phaseId === phase.id);
        return (
          <section key={phase.id} className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold">
                <span className="text-emerald-600 mr-2">{phaseIndex + 1}.</span>
                {phase.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1">{phase.intro}</p>
            </div>
            <ul className="space-y-2">
              {visibleSteps.map((step) => {
                return (
                  <StepItem
                    key={step.id}
                    step={step}
                    done={Boolean(ticks[step.id])}
                    onToggle={toggle}
                    onHide={hideStep}
                  />
                );
              })}
              {customSteps.map((step) => {
                const done = Boolean(ticks[step.id]);
                return (
                  <li
                    key={step.id}
                    className={`rounded-lg border p-4 bg-white transition ${
                      done ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => {
                          toggle(step.id);
                        }}
                        className="mt-1 h-4 w-4 accent-emerald-600"
                      />
                      <div className="flex-1 space-y-1">
                        <span
                          className={`font-medium ${done ? 'line-through text-slate-400' : ''}`}
                        >
                          {step.title}
                        </span>
                        {step.detail ? (
                          <p className="text-sm text-slate-600 leading-relaxed">{step.detail}</p>
                        ) : null}
                        <p className="text-xs text-emerald-700">Added by you</p>
                      </div>
                      <button
                        onClick={() => {
                          deleteCustomStep(step.id);
                        }}
                        className="text-slate-300 hover:text-red-500 transition"
                        title="Delete this step"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {addingPhase === phase.id ? (
                <div className="w-full">
                  <AddStepForm
                    onAdd={(title, detail) => {
                      addCustomStep(phase.id, title, detail);
                    }}
                    onCancel={() => {
                      setAddingPhase(null);
                    }}
                  />
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAddingPhase(phase.id);
                  }}
                  className="inline-flex items-center gap-1 text-emerald-700 hover:underline"
                >
                  <Plus className="h-4 w-4" />
                  Add your own step
                </button>
              )}
              {hiddenCount > 0 ? (
                <button
                  onClick={() => {
                    restorePhase(phase.id);
                  }}
                  className="text-slate-500 hover:text-slate-700 hover:underline"
                >
                  {hiddenCount} hidden step{hiddenCount > 1 ? 's' : ''} — restore
                </button>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}

type StepItemProps = {
  step: Step;
  done: boolean;
  onToggle: (id: string) => void;
  onHide: (id: string) => void;
};

function StepItem({ step, done, onToggle, onHide }: StepItemProps): JSX.Element {
  return (
    <li
      className={`rounded-lg border p-4 bg-white transition ${
        done ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={done}
          onChange={() => {
            onToggle(step.id);
          }}
          className="mt-1 h-4 w-4 accent-emerald-600"
        />
        <div className="flex-1 space-y-1">
          <span className={`font-medium ${done ? 'line-through text-slate-400' : ''}`}>
            {step.title}
          </span>
          <p className="text-sm text-slate-600 leading-relaxed">{step.detail}</p>
          {step.warning ? (
            <p className="text-sm text-amber-700 flex items-start gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              {step.warning}
            </p>
          ) : null}
          {step.links && step.links.length > 0 ? (
            <p className="flex flex-wrap gap-3 pt-1">
              {step.links.map((link) => {
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:underline"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </p>
          ) : null}
        </div>
        <button
          onClick={() => {
            onHide(step.id);
          }}
          className="text-slate-300 hover:text-slate-500 transition"
          title="Hide this step (does not apply to me)"
        >
          <EyeOff className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
