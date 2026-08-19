import { useEffect, useState } from 'react';
import { Landing } from './pages/Landing';
import { ChecklistPage } from './pages/ChecklistPage';
import { ReportPage } from './pages/ReportPage';
import { Layout } from './components/Layout';
import { defaultCountry } from './data/countries';

const getPath = (): string => {
  return window.location.pathname.replace(/\/+$/, '') || '/';
};

type PageMeta = {
  title: string;
  description: string;
};

const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: 'Unlink — cancel a SIM or move house without losing accounts',
    description:
      'Free Singapore checklists for cancelling a mobile number or changing address: move 2FA, WhatsApp, PayNow, Singpass, banks and ICA in the right order — before it is too late.'
  },
  '/cancel-sim': {
    title: 'Cancelling a Singapore mobile number — full checklist | Unlink',
    description:
      'Step-by-step checklist before cancelling a Singapore SIM: move 2FA off SMS, deregister PayNow, update Singpass and banks, WhatsApp Change number — in the order that avoids lockouts.'
  },
  '/moving': {
    title: 'Change of address Singapore — moving house checklist | Unlink',
    description:
      'Moving house in Singapore: ICA change of address within 28 days, OSCARS and MyInfo, then banks, insurers, utilities and SingPost mail redirection. The full sequence.'
  },
  '/report': {
    title: 'Receiving SMS meant for your number’s previous owner? | Unlink',
    description:
      'Your recycled number still gets the previous owner’s bank OTPs and app messages. Tell the sender safely — contact paths for DBS, OCBC, UOB, Grab and more.'
  }
};

const applyMeta = (path: string): void => {
  const meta = pageMeta[path] ?? pageMeta['/'];
  document.title = meta.title;
  const tag = document.querySelector('meta[name="description"]');
  if (tag) {
    tag.setAttribute('content', meta.description);
  }
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
      page = <ChecklistPage checklist={defaultCountry.simChecklist} />;
      break;
    case '/moving':
      page = <ChecklistPage checklist={defaultCountry.moveChecklist} />;
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
