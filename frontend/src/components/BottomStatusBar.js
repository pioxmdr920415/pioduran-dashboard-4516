import React from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const BottomStatusBar = () => {
  const { isOnline, isSyncing, lastSyncTime, handleSync } = useApp();
  const { isDarkMode } = useTheme();

  const formatSyncTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-900/90 border-gray-700/50'
          : 'bg-white/90 border-gray-200/50'
      }`}
      data-testid="bottom-status-bar"
    >
      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 flex items-center justify-between gap-4">
          {/* Connection Status */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border transition-all ${
              isOnline
                ? isDarkMode
                  ? 'bg-green-500/10 border-green-400/30 text-green-400'
                  : 'bg-green-500/10 border-green-400/30 text-green-600'
                : isDarkMode
                  ? 'bg-yellow-500/10 border-yellow-400/30 text-yellow-400'
                  : 'bg-yellow-500/10 border-yellow-400/30 text-yellow-600'
            }`}>
              <div className={`w-2.5 h-2.5 rounded-full ${
                isOnline ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
              } animate-pulse`} />
              <span className="text-sm font-semibold">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>

            {lastSyncTime && (
              <div className={`text-xs px-3 py-2 rounded-lg ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Last sync: {formatSyncTime(lastSyncTime)}
              </div>
            )}
          </div>

          {/* Sync Button */}
          {isOnline && (
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isDarkMode
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`}
              data-testid="sync-button"
              title="Sync with server"
            >
              {isSyncing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Sync Now</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomStatusBar;
