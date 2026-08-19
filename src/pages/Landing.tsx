import { Smartphone, Home, MessageSquareWarning, ShieldCheck } from 'lucide-react';

type LandingProps = {
  navigate: (to: string) => void;
};

const cards = [
  {
    to: '/cancel-sim',
    icon: Smartphone,
    title: 'Cancelling a mobile number',
    text: 'Your number will be recycled to a stranger. Move WhatsApp, PayNow, Singpass and SMS 2FA off it — in the right order — before you cancel the line.'
  },
  {
    to: '/moving',
    icon: Home,
    title: 'Moving house',
    text: 'One ICA update covers most of government. Banks, insurers and subscriptions keep your old address until you change each one. Here is the full sequence.'
  },
  {
    to: '/report',
    icon: MessageSquareWarning,
    title: 'Receiving someone else’s SMS?',
    text: 'Your new number used to belong to someone. Tell the sender — the bank or app can reach the previous owner; you cannot and should not.'
  }
];

export function Landing({ navigate }: LandingProps): JSX.Element {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Leave nothing behind when your number or address changes
        </h1>
        <p className="text-slate-600 leading-relaxed">
          Phone numbers and addresses live in dozens of systems that never talk to each other.
          When you cancel a SIM or move house, the copies left behind become someone else’s
          problem — or someone else’s opportunity. These checklists put the steps in the order
          that avoids lockouts.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-1">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.to}
              onClick={() => {
                navigate(card.to);
              }}
              className="text-left rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-400 hover:shadow-sm transition"
            >
              <div className="flex items-start gap-4">
                <Icon className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-lg">{card.title}</h2>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{card.text}</p>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      <section className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 flex items-start gap-4">
        <ShieldCheck className="h-6 w-6 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-sm text-emerald-900 leading-relaxed">
          <p className="font-semibold">Why this site collects nothing</p>
          <p className="mt-1">
            A site that “scans” whether a number or address is registered elsewhere would need
            your data and unofficial access to other companies’ systems — the same machinery
            scammers use. The safe version is this: correct ordering, official links, and your
            own eyes on your own accounts. Ticks stay in your browser.
          </p>
        </div>
      </section>
    </div>
  );
}
