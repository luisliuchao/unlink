export type CustomStep = {
  id: string;
  phaseId: string;
  title: string;
  detail: string;
};

export type Customization = {
  hidden: string[];
  custom: CustomStep[];
};

export const emptyCustomization: Customization = { hidden: [], custom: [] };

const storageKey = (slug: string): string => {
  return `unlink-sg:${slug}:custom`;
};

const maxTitle = 200;
const maxDetail = 1000;
const maxCustomSteps = 50;
const maxHidden = 200;

const isCustomStep = (value: unknown): value is CustomStep => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const step = value as Record<string, unknown>;
  return (
    typeof step.id === 'string' &&
    typeof step.phaseId === 'string' &&
    typeof step.title === 'string' &&
    step.title.length > 0 &&
    step.title.length <= maxTitle &&
    typeof step.detail === 'string' &&
    step.detail.length <= maxDetail
  );
};

export const isCustomization = (value: unknown): value is Customization => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const c = value as Record<string, unknown>;
  return (
    Array.isArray(c.hidden) &&
    c.hidden.length <= maxHidden &&
    c.hidden.every((id) => typeof id === 'string') &&
    Array.isArray(c.custom) &&
    c.custom.length <= maxCustomSteps &&
    c.custom.every(isCustomStep)
  );
};

export const hasCustomization = (c: Customization): boolean => {
  return c.hidden.length > 0 || c.custom.length > 0;
};

export const loadCustomization = (slug: string): Customization => {
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isCustomization(parsed)) {
        return parsed;
      }
    }
  } catch {
    // corrupted storage — start fresh
  }
  return emptyCustomization;
};

export const saveCustomization = (slug: string, c: Customization): void => {
  window.localStorage.setItem(storageKey(slug), JSON.stringify(c));
};

export const clearCustomization = (slug: string): void => {
  window.localStorage.removeItem(storageKey(slug));
};

// base64url so payloads survive URL fragments and chat apps.
export const encodeCustomization = (c: Customization): string => {
  const bytes = new TextEncoder().encode(JSON.stringify(c));
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decodeCustomization = (encoded: string): Customization | null => {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (isCustomization(parsed)) {
      return parsed;
    }
  } catch {
    // malformed share payload
  }
  return null;
};
