import React from 'react';
import { Play, Download, Loader2 } from 'lucide-react';
import { useGeneratorStore } from '../store/generatorStore';
import { ExportFormat } from '../types';

export function GeneratorPanel() {
  const { generateEmails, exportEmails, isGenerating, progress, emails } = useGeneratorStore();

  const exportFormats: ExportFormat[] = ['txt', 'csv', 'json'];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Generator</h2>
        <div className="flex gap-2">
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2 disabled:opacity-50"
            onClick={() => generateEmails()}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Generate
          </button>
          <div className="flex gap-2">
            {exportFormats.map((format) => (
              <button
                key={format}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 disabled:opacity-50"
                onClick={() => exportEmails(format)}
                disabled={emails.length === 0}
              >
                <Download className="w-4 h-4" />
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isGenerating && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Generated {emails.length} emails...
          </p>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
            {emails.slice(0, 10).map((email, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {email.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {email.profile ? `${email.profile.firstName} ${email.profile.lastName}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {email.profile?.phone || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {email.profile?.location || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {emails.length > 10 && (
        <p className="text-sm text-gray-500 mt-2">
          Showing 10 of {emails.length} generated emails
        </p>
      )}
    </div>
  );
}