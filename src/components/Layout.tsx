import { ReactNode } from 'react';
import { Link2 } from 'lucide-react';
import { ShareBar } from './ShareBar';

type LayoutProps = {
  path: string;
  navigate: (to: string) => void;
  children: ReactNode;
};

const navItems = [
  { to: '/cancel-sim', label: 'Cancelling a SIM' },
  { to: '/moving', label: 'Moving house' },
  { to: '/report', label: 'Got someone else’s SMS?' }
];

export function Layout({ path, navigate, children }: LayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            onClick={() => {
              navigate('/');
            }}
            className="flex items-center gap-2 font-semibold text-lg tracking-tight"
          >
            <Link2 className="h-5 w-5 text-emerald-600" />
            Unlink
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800">
              SG
            </span>
          </button>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {navItems.map((item) => {
              const active = path === item.to;
              return (
                <button
                  key={item.to}
                  onClick={() => {
                    navigate(item.to);
                  }}
                  className={
                    active
                      ? 'text-emerald-700 font-medium'
                      : 'text-slate-600 hover:text-slate-900'
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8">
        {children}
        <ShareBar path={path} />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6 text-xs text-slate-500 space-y-1">
          <p>
            No accounts, no tracking, no lookups. Ticks are saved only in your browser
            (localStorage). This site never asks for your number or address.
          </p>
          <p>
            Not affiliated with any government agency, telco or bank. Always use official apps and
            websites — never links inside unexpected SMS.
          </p>
        </div>
      </footer>
    </div>
  );
}
