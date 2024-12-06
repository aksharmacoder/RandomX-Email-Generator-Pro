import React from 'react';
import { Settings, Save, Trash2 } from 'lucide-react';
import { useGeneratorStore } from '../store/generatorStore';

export function ConfigPanel() {
  const { config, updateConfig } = useGeneratorStore();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configuration
        </h2>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
            onClick={() => {/* TODO: Save config */}}
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
            onClick={() => updateConfig({ keywords: [], blacklistedDomains: [] })}
          >
            <Trash2 className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Emails
            </label>
            <input
              type="number"
              value={config.count}
              onChange={(e) => updateConfig({ count: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              max="1000000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Username Length
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={config.minLength}
                onChange={(e) => updateConfig({ minLength: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md"
                min="1"
              />
              <input
                type="number"
                value={config.maxLength}
                onChange={(e) => updateConfig({ maxLength: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md"
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Options</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.includeNumbers}
                  onChange={(e) => updateConfig({ includeNumbers: e.target.checked })}
                  className="rounded"
                />
                Include Numbers
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.includeSpecialChars}
                  onChange={(e) => updateConfig({ includeSpecialChars: e.target.checked })}
                  className="rounded"
                />
                Include Special Characters
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.useRealNames}
                  onChange={(e) => updateConfig({ useRealNames: e.target.checked })}
                  className="rounded"
                />
                Use Real Names
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.includeProfile}
                  onChange={(e) => updateConfig({ includeProfile: e.target.checked })}
                  className="rounded"
                />
                Include Profile Data
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Domains (one per line)
            </label>
            <textarea
              value={config.domains.join('\n')}
              onChange={(e) => updateConfig({ domains: e.target.value.split('\n').filter(Boolean) })}
              className="w-full px-3 py-2 border rounded-md h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Keywords (one per line)
            </label>
            <textarea
              value={config.keywords.join('\n')}
              onChange={(e) => updateConfig({ keywords: e.target.value.split('\n').filter(Boolean) })}
              className="w-full px-3 py-2 border rounded-md h-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
}