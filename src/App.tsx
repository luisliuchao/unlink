import { useEffect, useState } from 'react';
import { Landing } from './pages/Landing';
import { ChecklistPage } from './pages/ChecklistPage';
import { ReportPage } from './pages/ReportPage';
import { Layout } from './components/Layout';
import { defaultCountry } from './data/countries';
import { pageMeta } from './pageMeta';

const getPath = (): string => {
  if (typeof window === 'undefined') {
    return '/';
  }
  return window.location.pathname.replace(/\/+$/, '') || '/';
};

const applyMeta = (path: string): void => {
  const meta = pageMeta[path] ?? pageMeta['/'];
  document.title = meta.title;
  const tag = document.querySelector('meta[name="description"]');
  if (tag) {
    tag.setAttribute('content', meta.description);
  }
};

type AppProps = {
  ssrPath?: string;
};

export default function App({ ssrPath }: AppProps): JSX.Element {
  const [path, setPath] = useState(ssrPath ?? getPath());

  useEffect(() => {
    const onPop = (): void => {
      setPath(getPath());
    };
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  useEffect(() => {
    applyMeta(path);
  }, [path]);

  const navigate = (to: string): void => {
    window.history.pushState(null, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  let page: JSX.Element;
  switch (path) {
    case '/cancel-sim':
      page = <ChecklistPage key="cancel-sim" checklist={defaultCountry.simChecklist} />;
      break;
    case '/moving':
      page = <ChecklistPage key="moving" checklist={defaultCountry.moveChecklist} />;
      break;
    case '/report':
      page = <ReportPage senders={defaultCountry.senders} />;
      break;
    default:
      page = <Landing navigate={navigate} />;
  }

  return (
    <Layout path={path} navigate={navigate}>
      {page}
    </Layout>
  );
}
