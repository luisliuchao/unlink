import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ExternalLink, RotateCcw } from 'lucide-react';
import { Checklist } from '../data/types';

type ChecklistPageProps = {
  checklist: Checklist;
};

type TickState = Record<string, boolean>;

const storageKey = (slug: string): string => {
  return `unlink-sg:${slug}`;
};

const loadTicks = (slug: string): TickState => {
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
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

export function ChecklistPage({ checklist }: ChecklistPageProps): JSX.Element {
  const [ticks, setTicks] = useState<TickState>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTicks(loadTicks(checklist.slug));
    setLoaded(true);
  }, [checklist.slug]);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(storageKey(checklist.slug), JSON.stringify(ticks));
    }
  }, [checklist.slug, ticks, loaded]);

  const allSteps = useMemo(() => {
    return checklist.phases.flatMap((phase) => {
      return phase.steps.map((step) => step.id);
    });
  }, [checklist]);

  const doneCount = allSteps.filter((id) => ticks[id]).length;

  const toggle = (id: string): void => {
    setTicks((prev) => {
      return { ...prev, [id]: !prev[id] };
    });
  };

  const reset = (): void => {
    setTicks({});
  };

  return (
    <div className="space-y-8">
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
            {doneCount} of {allSteps.length} done
          </span>
          <button
            onClick={reset}
            className="flex items-center gap-1 hover:text-slate-700"
            title="Clear all ticks"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${allSteps.length ? (doneCount / allSteps.length) * 100 : 0}%` }}
          />
        </div>
      </header>

      {checklist.phases.map((phase, phaseIndex) => {
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
              {phase.steps.map((step) => {
                const done = Boolean(ticks[step.id]);
                return (
                  <li
                    key={step.id}
                    className={`rounded-lg border p-4 bg-white transition ${
                      done ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-200'
                    }`}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => {
                          toggle(step.id);
                        }}
                        className="mt-1 h-4 w-4 accent-emerald-600"
                      />
                      <div className="space-y-1">
                        <span
                          className={`font-medium ${done ? 'line-through text-slate-400' : ''}`}
                        >
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
                                  onClick={(event) => {
                                    event.stopPropagation();
                                  }}
                                >
                                  {link.label}
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              );
                            })}
                          </p>
                        ) : null}
                      </div>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
