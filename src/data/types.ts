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

export type Sender = {
  id: string;
  name: string;
  category: 'bank' | 'government' | 'platform' | 'messaging' | 'other';
  how: string;
  channelLabel: string;
  channelUrl?: string;
  template: string;
};

export type Country = {
  code: string;
  name: string;
  simChecklist: Checklist;
  moveChecklist: Checklist;
  senders: Sender[];
};
