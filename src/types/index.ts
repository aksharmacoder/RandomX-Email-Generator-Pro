export interface EmailConfig {
  count: number;
  domains: string[];
  minLength: number;
  maxLength: number;
  includeNumbers: boolean;
  includeSpecialChars: boolean;
  keywords: string[];
  blacklistedDomains: string[];
  blacklistedKeywords: string[];
  useDisposable: boolean;
  useRealNames: boolean;
  includeProfile: boolean;
}

export interface Profile {
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
}

export interface GeneratedEmail {
  email: string;
  profile?: Profile;
}

export type ExportFormat = 'txt' | 'csv' | 'json' | 'xlsx';

export interface GeneratorStore {
  config: EmailConfig;
  emails: GeneratedEmail[];
  isGenerating: boolean;
  progress: number;
  darkMode: boolean;
  updateConfig: (config: Partial<EmailConfig>) => void;
  toggleDarkMode: () => void;
  generateEmails: () => void;
  exportEmails: (format: ExportFormat) => void;
}