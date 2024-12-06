import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useGeneratorStore } from './store/generatorStore';
import { ConfigPanel } from './components/ConfigPanel';
import { GeneratorPanel } from './components/GeneratorPanel';

function App() {
  const { darkMode, toggleDarkMode } = useGeneratorStore();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Email Generator
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="space-y-8">
            <ConfigPanel />
            <GeneratorPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;