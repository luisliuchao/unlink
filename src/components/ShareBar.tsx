import { useEffect, useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import { pageMeta, siteUrl } from '../pageMeta';

type ShareBarProps = {
  path: string;
};

type ShareTarget = {
  name: string;
  href: string;
};

export function ShareBar({ path }: ShareBarProps): JSX.Element {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`;
  const meta = pageMeta[path] ?? pageMeta['/'];
  const text = meta.title;

  // Native share only exists on the client; reveal after mount to keep hydration clean.
  useEffect(() => {
    if (typeof navigator.share === 'function') {
      setCanNativeShare(true);
    }
  }, []);

  const nativeShare = async (): Promise<void> => {
    try {
      await navigator.share({ title: text, url });
    } catch {
      // user dismissed the share sheet
    }
  };

  const copyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const targets: ShareTarget[] = [
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }
  ];

  const pill =
    'inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition';

  return (
    <div className="mt-12 border-t border-slate-200 pt-6">
      <p className="text-sm font-medium text-slate-500 mb-3">
        Know someone cancelling a line or moving? Share this page
      </p>
      <div className="flex flex-wrap gap-2">
        {canNativeShare ? (
          <button
            onClick={() => {
              void nativeShare();
            }}
            className={pill}
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        ) : null}
        {targets.map((target) => {
          return (
            <a
              key={target.name}
              href={target.href}
              target="_blank"
              rel="noopener noreferrer"
              className={pill}
            >
              {target.name}
            </a>
          );
        })}
        <button
          onClick={() => {
            void copyLink();
          }}
          className={pill}
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}
