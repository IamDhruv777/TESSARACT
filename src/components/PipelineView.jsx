import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

export default function PipelineView({ campaign }) {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold flex items-center justify-center space-x-3 mb-2">
          <span className="text-brand-orange">⚡</span>
          <span>AI Pipeline Processing</span>
          <span className="border border-brand-orange/30 text-brand-orange bg-orange-500/10 px-2 py-0.5 rounded text-xs tracking-widest uppercase ml-2">Generating</span>
        </h2>
        <p className="text-zinc-400">Generating campaign for <strong className="text-white">{campaign.feature_name}</strong></p>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-orange before:via-zinc-800 before:to-transparent">
        {campaign.steps.map((step, index) => {
          const isCompleted = step.status === 'completed';
          const isProcessing = step.status === 'processing';
          const isPending = step.status === 'pending';

          return (
            <motion.div 
              key={step.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isPending ? 'opacity-40' : 'opacity-100'}`}
            >
              {/* Icon / Indicator */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-brand-dark bg-zinc-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10 transition-colors
                ${isCompleted ? 'bg-green-500' : ''}
                ${isProcessing ? 'border-brand-orange' : ''}
              `}>
                {isCompleted && <Check size={18} className="text-white" />}
                {isProcessing && <Loader2 size={18} className="text-brand-orange animate-spin" />}
                {isPending && <span className="w-2 h-2 rounded-full bg-zinc-600" />}
              </div>

              {/* Content */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-card p-4 mx-4 shadow-lg shadow-black/20">
                <h3 className={`font-bold pb-1 ${isProcessing ? 'text-brand-orange' : 'text-white'}`}>{step.name}</h3>
                <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  {isCompleted ? 'Completed' : isProcessing ? 'Generating...' : 'Waiting...'}
                </p>
                {isProcessing && (
                  <div className="mt-3 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand-orange" 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "linear" }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
