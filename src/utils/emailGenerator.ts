import { EmailConfig, GeneratedEmail, Profile } from '../types';
import { generateProfile } from './profileGenerator';

const DISPOSABLE_DOMAINS = ['temp-mail.org', 'guerrillamail.com'];
const CHUNK_SIZE = 1000; // Process emails in smaller chunks

function generateUsername(config: EmailConfig): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '_.-';
  
  let allowedChars = chars;
  if (config.includeNumbers) allowedChars += numbers;
  if (config.includeSpecialChars) allowedChars += special;

  const length = Math.floor(
    Math.random() * (config.maxLength - config.minLength + 1) + config.minLength
  );

  const username = Array.from(
    { length },
    () => allowedChars.charAt(Math.floor(Math.random() * allowedChars.length))
  ).join('');

  if (config.keywords.length > 0) {
    const keyword = config.keywords[Math.floor(Math.random() * config.keywords.length)];
    return Math.random() > 0.5 ? `${username}${keyword}` : `${keyword}${username}`;
  }

  return username;
}

function isValidEmail(email: string, config: EmailConfig): boolean {
  if (config.blacklistedKeywords.some((keyword) => email.includes(keyword))) {
    return false;
  }

  const domain = email.split('@')[1];
  return !config.blacklistedDomains.includes(domain);
}

async function generateEmailChunk(
  config: EmailConfig,
  existingEmails: Set<string>,
  chunkSize: number,
  domains: string[]
): Promise<GeneratedEmail[]> {
  const result: GeneratedEmail[] = [];
  const attempts = new Set<string>();

  while (result.length < chunkSize && attempts.size < chunkSize * 2) {
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const username = generateUsername(config);
    const email = `${username}@${domain}`;

    if (!existingEmails.has(email) && !attempts.has(email) && isValidEmail(email, config)) {
      attempts.add(email);
      existingEmails.add(email);
      
      const generatedEmail: GeneratedEmail = { email };
      if (config.includeProfile) {
        generatedEmail.profile = generateProfile();
      }
      result.push(generatedEmail);
    }
  }

  return result;
}

export async function generateUniqueEmails(
  config: EmailConfig,
  onProgress: (progress: number) => void
): Promise<GeneratedEmail[]> {
  const emails = new Set<string>();
  const result: GeneratedEmail[] = [];
  const domains = config.useDisposable 
    ? [...config.domains, ...DISPOSABLE_DOMAINS]
    : config.domains;

  const totalChunks = Math.ceil(config.count / CHUNK_SIZE);
  
  for (let i = 0; i < totalChunks; i++) {
    const remainingCount = config.count - result.length;
    const currentChunkSize = Math.min(CHUNK_SIZE, remainingCount);
    
    // Use setTimeout to allow the event loop to process other tasks
    await new Promise(resolve => setTimeout(resolve, 0));
    
    const chunk = await generateEmailChunk(config, emails, currentChunkSize, domains);
    result.push(...chunk);
    
    onProgress((result.length / config.count) * 100);
  }

  return result;
}