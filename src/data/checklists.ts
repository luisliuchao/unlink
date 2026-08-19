export type Step = {
  id: string;
  title: string;
  detail: string;
  links?: { label: string; url: string }[];
  warning?: string;
};

export type Phase = {
  id: string;
  title: string;
  intro: string;
  steps: Step[];
};

export type Checklist = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  keyRule: string;
  phases: Phase[];
};

export const simChecklist: Checklist = {
  slug: 'cancel-sim',
  title: 'Cancelling a Singapore mobile number',
  tagline: 'Unlink everything while you can still receive OTPs.',
  intro:
    'Your number will be recycled and given to a stranger. Anything still linked to it — WhatsApp, PayNow, SMS 2FA — is what that stranger can receive or claim. Do these steps in order, before you cancel the line.',
  keyRule:
    'Golden rule: keep the SIM active until every step is done. Once the line is cut, OTP-gated removals become impossible.',
  phases: [
    {
      id: 'prepare',
      title: 'Prepare',
      intro: 'Have your landing spot ready before touching anything.',
      steps: [
        {
          id: 'new-number',
          title: 'Have your new number (or decide you will go number-free)',
          detail:
            'Most updates below ask you to verify a replacement number by OTP. Get the new SIM working first.'
        },
        {
          id: 'authenticator',
          title: 'Install an authenticator app',
          detail:
            'Google Authenticator, Authy or a password manager with TOTP. You will move SMS 2FA here so codes no longer depend on any phone number.'
        },
        {
          id: 'inventory',
          title: 'Build your list: search your inbox and SMS history',
          detail:
            'Search email for "verification", "OTP", "phone", "2FA". Scroll your SMS inbox — every sender there (bank, Grab, Google, clinic) is an account linked to this number.'
        }
      ]
    },
    {
      id: 'twofa',
      title: 'Move 2FA off SMS first',
      intro:
        'This is the step people skip, and the one that locks them out. If you remove the number before replacing 2FA, some accounts become unrecoverable.',
      steps: [
        {
          id: 'google-2fa',
          title: 'Google: replace SMS 2FA and recovery phone',
          detail:
            'myaccount.google.com → Security → 2-Step Verification: add authenticator or passkey, then remove the old number. Also check Personal info → Phone, and Security → Recovery phone — they are separate.',
          links: [{ label: 'Google account', url: 'https://myaccount.google.com' }],
          warning: 'Removing the number in one place does not clear it everywhere in Google.'
        },
        {
          id: 'apple-2fa',
          title: 'Apple ID: update trusted phone number',
          detail:
            'Settings → [your name] → Sign-In & Security → add the new number as trusted first, then remove the old one. Apple requires at least one trusted number.',
          links: [{ label: 'Apple ID', url: 'https://account.apple.com' }]
        },
        {
          id: 'ms-2fa',
          title: 'Microsoft: security info',
          detail:
            'account.microsoft.com → Security → Security info. Replace the old phone with authenticator or the new number.',
          links: [{ label: 'Microsoft account', url: 'https://account.microsoft.com/security' }]
        },
        {
          id: 'other-2fa',
          title: 'Everything else that texts you codes',
          detail:
            'Work SSO, GitHub, crypto exchanges, brokerages, admin portals. Switch each to authenticator app or passkey, save backup codes, then remove the old number.'
        }
      ]
    },
    {
      id: 'money',
      title: 'Money and identity (Singapore)',
      intro: 'Banks and government services are the highest-stakes leftovers.',
      steps: [
        {
          id: 'paynow',
          title: 'PayNow: deregister or move the mobile proxy',
          detail:
            'In your bank app, delete the PayNow mobile profile or update your registered mobile — the old proxy then drops off automatically. Otherwise money sent to your old number goes to a stranger (or theirs to you).',
          links: [
            { label: 'DBS/POSB steps', url: 'https://www.dbs.com.sg/personal/support/bank-ssb-paynow-deregister-profile.html' }
          ]
        },
        {
          id: 'banks',
          title: 'Every bank and card: update registered mobile',
          detail:
            'Change the mobile number in each bank app, then confirm SMS OTPs now go to the new number. Do this per bank — they do not share updates.'
        },
        {
          id: 'singpass',
          title: 'Singpass: update mobile',
          detail:
            'Update your registered mobile in the Singpass app or portal. If Singpass OTP still goes to the old SIM after cancellation, account recovery gets painful.',
          links: [{ label: 'Singpass', url: 'https://www.singpass.gov.sg' }]
        },
        {
          id: 'wallets-apps',
          title: 'Grab, Foodpanda, Shopee, Lazada, Carousell, transit and telco apps',
          detail:
            'Profile → change mobile, complete OTP on the new number. These accounts hold payment methods and order history.'
        }
      ]
    },
    {
      id: 'social',
      title: 'Social and email recovery',
      intro: 'Less urgent than money, but they let strangers reset your passwords.',
      steps: [
        {
          id: 'social-accounts',
          title: 'Facebook, Instagram, TikTok, X: remove or replace the number',
          detail: 'Settings → personal/contact info on each. Remove the old number or swap it for the new one.'
        },
        {
          id: 'email-recovery',
          title: 'Email accounts: recovery phone',
          detail:
            'Any mailbox (not just Gmail) that uses this number for recovery. If a stranger can SMS-reset your email, they can reset everything else.'
        }
      ]
    },
    {
      id: 'messaging',
      title: 'Messaging apps — do these last',
      intro:
        'Messaging apps are identity, and the switch is one-way. Do them after everything above, while the old SIM still receives SMS.',
      steps: [
        {
          id: 'whatsapp',
          title: 'WhatsApp: use Change number (or Delete account)',
          detail:
            'Keeping WhatsApp: Settings → Account → Change number — this migrates chats and deletes the old-number account. Leaving WhatsApp: Settings → Account → Delete my account. Uninstalling the app does NOT deregister the number.',
          links: [{ label: 'WhatsApp: changing numbers', url: 'https://faq.whatsapp.com/1166321223998129' }],
          warning: 'Uninstalling is not deregistering. The account stays claimable on the old number.'
        },
        {
          id: 'telegram',
          title: 'Telegram: Change Number, or delete the account',
          detail:
            'Keeping Telegram: Settings → tap your number → Change Number. Leaving: use the deactivation page. Inactive accounts otherwise linger for months and are claimable by the next SIM owner.',
          links: [{ label: 'Telegram deactivation', url: 'https://my.telegram.org/auth?to=delete-account-direct-link' }]
        },
        {
          id: 'signal-others',
          title: 'Signal, Viber, WeChat, LINE, WhatsApp Business',
          detail:
            'Each has its own change-number or delete-account flow in settings. Same rule: uninstalling leaves the number registered.'
        }
      ]
    },
    {
      id: 'quiet',
      title: 'Quiet period, then cancel',
      intro: 'The SIM itself is your final audit tool.',
      steps: [
        {
          id: 'watch-sms',
          title: 'Keep the SIM for 1–2 weeks and watch every SMS',
          detail:
            'Each unexpected OTP, bank alert or app message is an account you missed. Update that account, then keep waiting. A quiet week means you are done.'
        },
        {
          id: 'cancel',
          title: 'Cancel the line',
          detail:
            'Only now tell the telco to terminate. Whatever is still linked after this is what the next owner of your number inherits.'
        }
      ]
    }
  ]
};

export const moveChecklist: Checklist = {
  slug: 'moving',
  title: 'Changing your address in Singapore',
  tagline: 'One government update fans out — everything else is on you.',
  intro:
    'Government systems mostly sync from one ICA update. Banks, insurers, telcos and subscriptions do not — each keeps your old address until you change it. Mail that still arrives at the old unit is your remaining to-do list.',
  keyRule:
    'Legal requirement: IC holders must report a change of residential address to ICA within 28 days of moving.',
  phases: [
    {
      id: 'gov',
      title: 'Government first (one update, wide effect)',
      intro: 'Do the ICA update before anything else — many agencies follow automatically.',
      steps: [
        {
          id: 'ica',
          title: 'ICA eCOA: report the new address',
          detail:
            'Log in with Singpass at go.gov.sg/ic-address. A 6-digit PIN is mailed to your NEW address; enter it to verify, then paste the address sticker on your IC. Free of charge.',
          links: [{ label: 'ICA change of address', url: 'https://go.gov.sg/ic-address' }]
        },
        {
          id: 'oscars',
          title: 'Let OSCARS fan out, then verify MyInfo',
          detail:
            'Participating agencies (IRAS, HDB, CPF and others) update within about one working day. A day later, open Singpass → MyInfo and confirm the new address shows.',
          links: [
            { label: 'Participating agencies list', url: 'https://www.ica.gov.sg/documents/ic/update_residential_address' }
          ]
        },
        {
          id: 'mailing-vs-residential',
          title: 'Check mailing address separately (IRAS and others)',
          detail:
            'OSCARS updates your residential address. A different mailing address does not move with it — check myTax Portal → Update Contact & Notice Preferences.',
          warning: 'Residential and mailing addresses are separate fields in several agencies.'
        },
        {
          id: 'special-cases',
          title: 'Special cases: overseas move, work passes',
          detail:
            'Moving overseas: register a Local Contact Address with ELD to stay on the electoral roll. Work pass / LTVP holders update via MOM or ICA FDW eService instead.'
        }
      ]
    },
    {
      id: 'private',
      title: 'Private sector (no auto-sync)',
      intro: 'None of these listen to OSCARS. Update each one; many apps can pull the new address from MyInfo once you tap update.',
      steps: [
        {
          id: 'banks-addr',
          title: 'Banks, cards and insurers',
          detail:
            'Statements, replacement cards and policy letters go to the registered address. Most SG bank apps let you sync from MyInfo after your ICA update — do ICA first, then this is two taps.'
        },
        {
          id: 'utilities',
          title: 'Utilities, telco, town council / MCST',
          detail:
            'SP or Open Electricity account for the new place, close or transfer the old one. Update billing addresses at your telco and ISP. Inform town council or condo management.'
        },
        {
          id: 'daily-life',
          title: 'Employer, school, clinics, memberships',
          detail: 'HR records, school contact records, family clinic, dental, gym, season parking.'
        },
        {
          id: 'ecommerce',
          title: 'Delivery addresses: Shopee, Lazada, Amazon, food apps',
          detail:
            'Change the default address and delete the old one, or your next parcel goes to a stranger. Check saved addresses in ride apps too.'
        }
      ]
    },
    {
      id: 'safety-net',
      title: 'Safety net',
      intro: 'You will miss some. Make the misses visible instead of silent.',
      steps: [
        {
          id: 'redirect',
          title: 'SingPost mail redirection for 3–6 months',
          detail:
            'Every redirected letter identifies an organisation you forgot. Update it, then wait for the redirect to go quiet.',
          links: [{ label: 'SingPost redirection', url: 'https://www.singpost.com/send-receive/redirect-mail' }]
        },
        {
          id: 'new-occupant',
          title: 'Ask the new occupant (if you can)',
          detail:
            'Mail still arriving for you at the old unit after 2–3 months is the definitive list of what you missed.'
        }
      ]
    }
  ]
};

export const checklists = [simChecklist, moveChecklist];
