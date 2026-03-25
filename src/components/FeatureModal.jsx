import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function FeatureModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    feature_name: 'Hackathon analytics dashboard',
    description: 'Advanced visualization for tracking submissions and participant engagement.',
    benefits: 'Monitor participants\nTrack submissions\nMeasure engagement',
    audience: 'community organizers'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Direct POST to System Backend for prototype simplicity (simulating Webhook)
      await axios.post('http://localhost:8001/api/webhook', {
        feature_name: formData.feature_name,
        description: formData.description + " Benefits: " + formData.benefits,
        source: "prototype-modal",
        timestamp: new Date().toISOString()
      });
      onSuccess();
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#121214] border border-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🚀</span>
            <div>
              <h3 className="font-bold text-lg">New Feature Launch</h3>
              <p className="text-xs text-zinc-400">Enter your feature details to generate a full campaign</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center space-x-2 text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-4">
            <span>Quick Fill:</span>
            <button type="button" className="px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700 transition">Hackathon Analytics</button>
            <button type="button" className="px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700 transition">AI Event</button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Feature Name</label>
            <input 
              type="text" 
              required
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-2 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
              value={formData.feature_name}
              onChange={e => setFormData({...formData, feature_name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Description</label>
            <textarea 
              required rows={2}
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-2 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="What does this feature do?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Benefits (one per line)</label>
            <textarea 
              required rows={3}
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-2 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all resize-none"
              value={formData.benefits}
              onChange={e => setFormData({...formData, benefits: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Target Audience</label>
            <input 
              type="text" 
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-4 py-2 focus:outline-none focus:border-brand-orange transition-all"
              value={formData.audience}
              onChange={e => setFormData({...formData, audience: e.target.value})}
              placeholder="e.g. community organizers"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-800 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-brand-orange hover:bg-orange-600 text-white px-6 py-2 rounded-md font-bold transition-all disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              <span>{isSubmitting ? 'Generating...' : 'Generate Campaign'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
