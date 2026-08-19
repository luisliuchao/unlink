import { Step } from '../types';

// SIM cancellation: steps that apply in any country.

export const simPrepareSteps: Step[] = [
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
      'Search email for "verification", "OTP", "phone", "2FA". Scroll your SMS inbox — every sender there (bank, ride app, Google, clinic) is an account linked to this number.'
  }
];

export const simTwoFaSteps: Step[] = [
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
];

export const simSocialSteps: Step[] = [
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
];

export const simMessagingSteps: Step[] = [
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
];

export const simQuietSteps: Step[] = [
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
];

// Moving house: steps that apply in any country.

export const moveDailyLifeStep: Step = {
  id: 'daily-life',
  title: 'Employer, school, clinics, memberships',
  detail: 'HR records, school contact records, family clinic, dental, gym, season parking.'
};

export const moveNewOccupantStep: Step = {
  id: 'new-occupant',
  title: 'Ask the new occupant (if you can)',
  detail:
    'Mail still arriving for you at the old unit after 2–3 months is the definitive list of what you missed.'
};
