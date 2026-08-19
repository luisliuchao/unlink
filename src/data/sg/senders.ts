import { Sender } from '../types';

const numberTemplate = (service: string): string => {
  return (
    `Hi ${service}, I recently got a recycled mobile number and I am receiving SMS from you ` +
    `intended for its previous owner. I am not your customer on this number. ` +
    `Please unlink this number from the account it is attached to and notify the account holder ` +
    `through their other contact details (email or app) so they can update their records. ` +
    `I have not used any OTP or link sent to this number.`
  );
};

export const senders: Sender[] = [
  {
    id: 'dbs',
    name: 'DBS / POSB',
    category: 'bank',
    how: 'Use in-app chat in digibank, or the DBS hotline 1800 111 1111. Mention "recycled mobile number" and ask them to de-link it and inform the previous customer.',
    channelLabel: 'DBS contact page',
    channelUrl: 'https://www.dbs.com.sg/personal/contact-us.page',
    template: numberTemplate('DBS')
  },
  {
    id: 'ocbc',
    name: 'OCBC',
    category: 'bank',
    how: 'OCBC app chat or hotline 1800 363 3333. If PayNow registration clashes on your new number, tell them — banks coordinate to release the old proxy.',
    channelLabel: 'OCBC contact page',
    channelUrl: 'https://www.ocbc.com/personal-banking/help-and-support',
    template: numberTemplate('OCBC')
  },
  {
    id: 'uob',
    name: 'UOB',
    category: 'bank',
    how: 'UOB TMRW app chat or hotline 1800 222 2121.',
    channelLabel: 'UOB contact page',
    channelUrl: 'https://www.uob.com.sg/personal/customer-service/index.page',
    template: numberTemplate('UOB')
  },
  {
    id: 'gov',
    name: 'Government (gov.sg / Singpass / agency SMS)',
    category: 'government',
    how: 'Do not tap links in the SMS. Contact the agency through its official website. For Singpass-related SMS, use the Singpass helpdesk (+65 6335 3533).',
    channelLabel: 'Singpass contact',
    channelUrl: 'https://www.singpass.gov.sg/main/contact/',
    template: numberTemplate('the agency')
  },
  {
    id: 'grab',
    name: 'Grab',
    category: 'platform',
    how: 'Grab app → Account → Help Centre → report an account issue. Say the number was reassigned to you so they can flag the old account.',
    channelLabel: 'Grab help centre',
    channelUrl: 'https://help.grab.com',
    template: numberTemplate('Grab')
  },
  {
    id: 'google',
    name: 'Google',
    category: 'platform',
    how: 'You cannot email Google support directly. If Google SMS arrive, the previous owner listed this number for recovery — codes are useless to them without more factors. Never share or use the codes.',
    channelLabel: 'Google account help',
    channelUrl: 'https://support.google.com/accounts',
    template: numberTemplate('Google')
  },
  {
    id: 'shopee-lazada',
    name: 'Shopee / Lazada',
    category: 'platform',
    how: 'In-app chat support. Ask them to unlink the number from the previous account so you can register it on yours.',
    channelLabel: 'Shopee help',
    channelUrl: 'https://help.shopee.sg',
    template: numberTemplate('Shopee/Lazada')
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp / Telegram verification codes',
    category: 'messaging',
    how: 'Ignore the code — someone may be trying to register the old owner’s account, or the old owner is trying to recover it. Never enter or forward a code. If you want the number for yourself, register normally in the app; WhatsApp purges old profile data after about 45 days of inactivity plus new-device activation.',
    channelLabel: 'WhatsApp: recycled numbers',
    channelUrl: 'https://faq.whatsapp.com/3347469605523961',
    template:
      'No report needed. Never enter, share or forward a verification code that you did not request — codes are how accounts get stolen.'
  },
  {
    id: 'scam',
    name: 'Looks like a scam',
    category: 'other',
    how: 'Report via the ScamShield app or call the ScamShield helpline 1799. Do not reply to the SMS.',
    channelLabel: 'ScamShield',
    channelUrl: 'https://www.scamshield.gov.sg',
    template:
      'Report through ScamShield instead of replying. Replying confirms your number is live and attracts more scams.'
  },
  {
    id: 'other',
    name: 'Any other company',
    category: 'other',
    how: 'Find the official support channel from the company website (not from the SMS). Send them the message below.',
    channelLabel: '',
    template: numberTemplate('there')
  }
];
