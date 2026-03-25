import React from 'react';
import { motion } from 'framer-motion';
import { Share, Copy, Video, Play, FileImage, Image as ImageIcon, Rocket } from 'lucide-react';

export default function CampaignView({ campaign }) {
  const result = campaign.result;
  
  const platforms = Object.entries(result.platforms);
  
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold text-green-500 uppercase tracking-widest border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded shadow-sm shadow-green-500/10">Campaign Ready</span>
          <h1 className="text-4xl font-extrabold mt-3 text-white tracking-tight">{campaign.feature_name}</h1>
          <p className="text-brand-orange text-sm font-semibold mt-2">{result.campaign_angle}</p>
        </div>
        <button className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 font-bold">
          <Share size={18} />
          <span>Publish Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatsCard title="Core Message" value={result.core_message} />
        <StatsCard title="Campaign Angle" value={result.campaign_angle} />
        <div className="glass-card p-5 border-zinc-800">
          <h3 className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-3">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {result.keywords.map(kw => (
              <span key={kw} className="px-2.5 py-1 rounded bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 shadow-sm">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-5 flex items-center space-x-2 text-white">
          <span className="text-2xl">📱</span> <span>Platform Posts</span>
          <span className="ml-auto text-xs font-semibold text-zinc-500">{platforms.length} platforms</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {platforms.map(([platform, text], i) => (
            <PlatformCard key={platform} platform={platform} text={text} delay={i * 0.1} />
          ))}
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-5 flex items-center space-x-2 text-white">
          <span className="text-brand-orange text-2xl">#</span> <span>Hashtags</span>
        </h2>
        <div className="glass-card p-6 flex flex-wrap gap-3">
          {result.keywords.map(kw => (
            <span key={kw} className="px-4 py-2 rounded-lg bg-zinc-900 border border-brand-orange/30 text-brand-orange text-sm font-semibold hover:bg-brand-orange hover:text-white transition-all cursor-pointer shadow-sm shadow-orange-500/10 hover:shadow-orange-500/30">#{kw}</span>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
          <FileImage className="text-brand-orange" size={20} />
          <span>Generated Assets</span>
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <CreativeCard type="Launch Poster" icon={ImageIcon} src={result.creatives.poster !== 'generated' ? result.creatives.poster : null} />
          <CreativeCard type="Carousel" slides={result.creatives.carousel} icon={Copy} />
          <CreativeCard type="Product Short" isVideo={result.creatives.video} icon={Video} />
          <CreativeCard type="Highlight GIF" icon={Play} src={typeof result.creatives.gif === 'string' ? result.creatives.gif : null} />
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value }) {
  return (
    <div className="glass-card p-5 border-zinc-800 flex flex-col justify-center transition-colors hover:bg-zinc-800/50">
      <h3 className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-2">{title}</h3>
      <p className="text-sm text-zinc-200 font-medium leading-relaxed">{value}</p>
    </div>
  );
}

function PlatformCard({ platform, text, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card border-zinc-800 flex flex-col h-full hover:border-zinc-500 transition-colors shadow-lg shadow-black/20"
    >
      <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900/50 rounded-t-xl">
        <span className="font-bold text-brand-orange capitalize flex items-center space-x-2">
          <span>{platform}</span>
        </span>
        <button className="text-zinc-400 hover:text-white flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-brand-orange transition-colors">
          <Copy size={14} />
          <span className="font-semibold">Copy</span>
        </button>
      </div>
      <div className="p-6 flex-1 text-zinc-300 text-[15px] whitespace-pre-wrap leading-relaxed">
        {text}
      </div>
      <div className="p-3 bg-zinc-900/80 text-xs text-green-500 font-semibold text-right border-t border-zinc-800/50 flex items-center justify-between rounded-b-xl">
        <span className="text-zinc-500">{text.length} chars</span>
        <span className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span>Ready to post</span>
        </span>
      </div>
    </motion.div>
  );
}

function CreativeCard({ type, slides, icon: Icon, isVideo, isGif, src }) {
  return (
    <div className="bg-brand-card border border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center text-center group hover:border-zinc-700 transition relative overflow-hidden h-40 shadow-lg shadow-black/20">
      {src ? (
        <a href={src} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0 cursor-pointer block hover:scale-105 transition-transform duration-500">
          <img src={src} alt={type} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        </a>
      ) : (
        <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 group-hover:text-brand-orange group-hover:scale-110 transition-all mb-3 z-10 relative">
          {Icon && <Icon size={24} />}
        </div>
      )}
      {!src && <h4 className="text-zinc-300 font-semibold z-10 relative">{type}</h4>}
      {src && (
        <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm z-10">
          {type.toUpperCase()}
        </div>
      )}
      {slides && <p className="text-xs text-zinc-500 mt-1 z-10 relative">{slides} slides generated</p>}
      {isVideo && <p className="text-xs text-zinc-500 mt-1 z-10 relative">15s Short generated</p>}
      {isGif && <p className="text-xs text-zinc-500 mt-1 z-10 relative">Animated GIF generated</p>}
    </div>
  );
}
