import React from 'react';
import { Rocket, Plus } from 'lucide-react';

export default function Sidebar({ onNewLaunch, campaigns, activeCampaignId, setActiveCampaignId }) {
  return (
    <div className="w-64 border-r border-zinc-800 bg-brand-card flex flex-col">
      <div className="p-4 flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 rounded bg-brand-orange flex items-center justify-center font-bold text-white">
          A
        </div>
        <div>
          <h1 className="font-bold leading-tight">AcmePlatform</h1>
          <p className="text-[10px] text-brand-orange tracking-widest font-semibold uppercase">LaunchGen AI</p>
        </div>
      </div>

      <div className="px-4 mb-6">
        <a 
          href="http://localhost:8000" target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 border border-zinc-700 hover:border-brand-orange hover:bg-brand-orange/10 hover:text-brand-orange text-zinc-300 bg-zinc-800/50 py-2 px-4 rounded font-medium transition-colors"
        >
          <Rocket size={18} />
          <span>Product Admin Panel</span>
        </a>
      </div>

      <div className="px-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold mb-3 uppercase tracking-wider">
          <span>Recent Launches</span>
          <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">{campaigns.length}</span>
        </div>
        
        <div className="space-y-2">
          {campaigns.length === 0 ? (
            <div className="text-sm text-zinc-500 text-center py-6 flex flex-col items-center">
              <Rocket size={20} className="mb-2 opacity-50" />
              <p>No features launched yet.</p>
            </div>
          ) : (
            campaigns.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCampaignId(c.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  activeCampaignId === c.id 
                    ? 'bg-zinc-800 border-zinc-700' 
                    : 'bg-transparent border-transparent hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${c.status === 'processing' ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`} />
                  <span className="font-medium text-sm truncate">{c.feature_name}</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1 ml-4 truncate">
                  {c.status === 'processing' ? 'Generating...' : 'Campaign ready'}
                </p>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
