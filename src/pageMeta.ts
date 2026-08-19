export type PageMeta = {
  title: string;
  description: string;
};

export const siteUrl = 'https://unlink.page';

export const pageMeta: Record<string, PageMeta> = {
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
