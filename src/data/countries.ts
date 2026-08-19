import { Country } from './types';
import { simChecklist, moveChecklist } from './sg/checklists';
import { senders } from './sg/senders';

export const singapore: Country = {
  code: 'sg',
  name: 'Singapore',
  simChecklist,
  moveChecklist,
  senders
};

// Future countries plug in here; routes become /<code>/... once there is more than one.
export const countries: Record<string, Country> = {
  sg: singapore
};

export const defaultCountry = singapore;
