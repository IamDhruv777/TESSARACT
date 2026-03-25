import React from 'react';
import PipelineView from './PipelineView';
import CampaignView from './CampaignView';
import { Rocket, FileText, Brain, LayoutDashboard, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ campaign, onNewLaunch }) {
  if (!campaign) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl text-center"
        >
          <div className="inline-block border border-orange-500/30 text-brand-orange bg-orange-500/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            AI-Powered Campaign Engine
          </div>
          
          <h2 className="text-5xl font-bold mb-6 text-white">
            <span className="text-brand-orange">LaunchGen</span> AI
          </h2>
          
          <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
            Waiting for payload from the <strong>External Product Webhook</strong>. 
            Once a feature gets published on the external client dashboard, the AI pipeline will trigger automatically.
          </p>
          
          <div className="flex flex-col items-center mx-auto space-y-4">
            <div className="flex items-center space-x-3 text-brand-orange font-bold px-6 py-3 rounded-lg border border-orange-500/30 bg-orange-500/10 shadow-lg shadow-orange-500/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange"></span>
              </span>
              <span>Listening for Webhook on Port 8001...</span>
            </div>
            <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white underline transition">
              Open Client Admin Dashboard (localhost:8000)
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center space-x-4">
            <Step icon={FileText} text="Add Feature" />
            <div className="text-zinc-600">→</div>
            <Step icon={Brain} text="AI Pipeline" />
            <div className="text-zinc-600">→</div>
            <Step icon={LayoutDashboard} text="Campaign Ready" />
            <div className="text-zinc-600">→</div>
            <Step icon={Share2} text="Publish" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-y-auto">
      {campaign.status === 'processing' ? (
        <PipelineView campaign={campaign} />
      ) : (
        <CampaignView campaign={campaign} />
      )}
    </div>
  );
}

function Step({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl w-32">
      <Icon className="text-zinc-400 mb-3" size={24} />
      <span className="text-xs font-semibold text-zinc-300">{text}</span>
    </div>
  );
}
