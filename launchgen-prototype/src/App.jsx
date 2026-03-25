import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FeatureModal from './components/FeatureModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaignId, setActiveCampaignId] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/campaigns');
      setCampaigns(res.data.campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    // Poll every 1 second
    const interval = setInterval(fetchCampaigns, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeCampaign = campaigns.find(c => c.id === activeCampaignId) || campaigns[0];

  return (
    <div className="flex h-screen overflow-hidden bg-brand-dark">
      <Sidebar 
        onNewLaunch={() => setIsModalOpen(true)} 
        campaigns={campaigns}
        activeCampaignId={activeCampaign?.id}
        setActiveCampaignId={setActiveCampaignId}
      />
      
      <main className="flex-1 overflow-y-auto">
        <Dashboard 
          campaign={activeCampaign} 
          onNewLaunch={() => setIsModalOpen(true)} 
        />
      </main>

      {isModalOpen && (
        <FeatureModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            setIsModalOpen(false);
            fetchCampaigns();
          }}
        />
      )}
    </div>
  );
}

export default App;
