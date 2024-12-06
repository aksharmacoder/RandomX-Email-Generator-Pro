import { create } from 'zustand';
import { GeneratorStore, EmailConfig, ExportFormat } from '../types';
import { generateUniqueEmails } from '../utils/emailGenerator';
import { exportToFile } from '../utils/exportUtils';

const DEFAULT_CONFIG: EmailConfig = {
  count: 100,
  domains: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'],
  minLength: 6,
  maxLength: 12,
  includeNumbers: true,
  includeSpecialChars: false,
  keywords: [],
  blacklistedDomains: [],
  blacklistedKeywords: [],
  useDisposable: false,
  useRealNames: true,
  includeProfile: false,
};

export const useGeneratorStore = create<GeneratorStore>((set, get) => ({
  config: DEFAULT_CONFIG,
  emails: [],
  isGenerating: false,
  progress: 0,
  darkMode: false,

  updateConfig: (newConfig) => {
    set((state) => ({
      config: { ...state.config, ...newConfig },
    }));
  },

  toggleDarkMode: () => {
    set((state) => ({ darkMode: !state.darkMode }));
  },

  generateEmails: async () => {
    const { config } = get();
    
    // Validate input
    if (config.count > 1000000) {
      alert('Maximum email count is 1,000,000');
      return;
    }
    
    if (config.count < 1) {
      alert('Minimum email count is 1');
      return;
    }

    set({ isGenerating: true, progress: 0, emails: [] });

    try {
      const emails = await generateUniqueEmails(config, (progress) => {
        set({ progress });
      });
      set({ emails, isGenerating: false, progress: 100 });
    } catch (error) {
      console.error('Error generating emails:', error);
      set({ isGenerating: false, progress: 0 });
      alert('An error occurred while generating emails. Please try again with a smaller count.');
    }
  },

  exportEmails: (format: ExportFormat) => {
    const { emails } = get();
    exportToFile(emails, format);
  },
}));