import { saveAs } from 'file-saver';
import { parse } from 'papaparse';
import { GeneratedEmail, ExportFormat } from '../types';

export function exportToFile(emails: GeneratedEmail[], format: ExportFormat): void {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `emails-${timestamp}`;

  switch (format) {
    case 'txt':
      const txtContent = emails.map(e => e.email).join('\n');
      const txtBlob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
      saveAs(txtBlob, `${filename}.txt`);
      break;

    case 'csv':
      const csvData = emails.map(e => ({
        email: e.email,
        firstName: e.profile?.firstName || '',
        lastName: e.profile?.lastName || '',
        phone: e.profile?.phone || '',
        location: e.profile?.location || '',
      }));
      const csv = parse(csvData);
      const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      saveAs(csvBlob, `${filename}.csv`);
      break;

    case 'json':
      const jsonBlob = new Blob([JSON.stringify(emails, null, 2)], {
        type: 'application/json;charset=utf-8',
      });
      saveAs(jsonBlob, `${filename}.json`);
      break;

    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}