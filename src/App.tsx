import { useEffect, useState } from 'react';
import { Landing } from './pages/Landing';
import { ChecklistPage } from './pages/ChecklistPage';
import { ReportPage } from './pages/ReportPage';
import { Layout } from './components/Layout';
import { simChecklist, moveChecklist } from './data/checklists';

const getPath = (): string => {
  return window.location.pathname.replace(/\/+$/, '') || '/';
};

export default function App(): JSX.Element {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onPop = (): void => {
      setPath(getPath());
    };
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  const navigate = (to: string): void => {
    window.history.pushState(null, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  let page: JSX.Element;
  switch (path) {
    case '/cancel-sim':
      page = <ChecklistPage checklist={simChecklist} />;
      break;
    case '/moving':
      page = <ChecklistPage checklist={moveChecklist} />;
      break;
    case '/report':
      page = <ReportPage />;
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
