import { useState } from 'react';
import { Check, Copy, ExternalLink, ShieldAlert } from 'lucide-react';
import { Sender } from '../data/types';

type ReportPageProps = {
  senders: Sender[];
};

export function ReportPage({ senders }: ReportPageProps): JSX.Element {
  const [selectedId, setSelectedId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const selected = senders.find((sender) => sender.id === selectedId);

  const copyTemplate = async (): Promise<void> => {
    if (selected) {
      await navigator.clipboard.writeText(selected.template);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">
          Getting SMS meant for the previous owner of your number?
        </h1>
        <p className="text-slate-600 leading-relaxed">
          Recycled numbers keep receiving messages for their old owner: bank OTPs, delivery
          updates, login codes. You cannot contact that person — but the company that sent the
          SMS can. Tell the sender, and they will unlink the number and reach their customer
          through email or their app.
        </p>
      </header>

      <section className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-900 space-y-2">
        <p className="font-semibold flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          First, three rules
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Never use, enter or forward an OTP you did not request — for anyone, ever.</li>
          <li>Never tap links inside unexpected SMS. Go to the official app or website yourself.</li>
          <li>Never try to identify or contact the previous owner. The sender will do it safely.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Who sent the SMS?</span>
          <select
            value={selectedId}
            onChange={(event) => {
              setSelectedId(event.target.value);
              setCopied(false);
            }}
            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
          >
            <option value="">Select a sender…</option>
            {senders.map((sender) => {
              return (
                <option key={sender.id} value={sender.id}>
                  {sender.name}
                </option>
              );
            })}
          </select>
        </label>

        {selected ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
              <h2 className="font-semibold">How to reach {selected.name}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{selected.how}</p>
              {selected.channelUrl ? (
                <a
                  href={selected.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:underline"
                >
                  {selected.channelLabel}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Message you can paste</h2>
                <button
                  onClick={() => {
                    void copyTemplate();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap rounded-lg bg-slate-50 p-3 border border-slate-100">
                {selected.template}
              </p>
            </div>
          </div>
        ) : null}
      </section>

      <section className="text-sm text-slate-600 leading-relaxed space-y-2">
        <h2 className="font-semibold text-slate-900">Why this works</h2>
        <p>
          Banks and apps do not know a number changed hands until someone tells them — MAS has
          said exactly this about PayNow. Once you report it, the sender can unlink your number
          and contact their customer through the details they already hold. You helped the
          previous owner without ever knowing who they are.
        </p>
        <p>
          Each sender you report is also one less stream of misdirected SMS on your new number.
        </p>
      </section>
    </div>
  );
}
