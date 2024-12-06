export const DISPOSABLE_DOMAINS = ['temp-mail.org', 'guerrillamail.com'];

export const EMAIL_PROVIDERS = {
  GMAIL: 'gmail.com',
  HOTMAIL: 'hotmail.com',
  OUTLOOK: 'outlook.com',
  YAHOO: 'yahoo.com',
} as const;

export const GEO_NAMES = {
  american: ['john', 'jane', 'michael', 'sarah'],
  indian: ['rahul', 'priya', 'arjun', 'anita'],
  chinese: ['li', 'wang', 'zhang', 'liu'],
  japanese: ['hiroshi', 'yuki', 'takashi', 'sakura'],
  korean: ['kim', 'lee', 'park', 'choi'],
  german: ['hans', 'anna', 'peter', 'lisa'],
  french: ['jean', 'marie', 'pierre', 'sophie'],
} as const;

export const LOCATIONS = {
  USA: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL'],
  INDIA: ['Mumbai, MH', 'Delhi, DL', 'Bangalore, KA'],
  CHINA: ['Beijing', 'Shanghai', 'Shenzhen'],
  JAPAN: ['Tokyo', 'Osaka', 'Kyoto'],
} as const;

export const CHUNK_SIZE = 1000;