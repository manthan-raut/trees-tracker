import React, { useState, useEffect } from 'react';
import MapView from './Map';
import TopNav from './TopNav';
import BottomPanel from './BottomPanel';

// Mock Data representing Tree Planting Areas (Centered around VNIT Nagpur)
const MOCK_DATA = [
  { id: 1, areaName: 'VNIT Main Gate', category: 'Urban Forest', lat: 21.1245, lng: 79.0520, treesPlanted: 1250, target: 1500, image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&w=300&q=80' },
  { id: 2, areaName: 'Ambazari Lake Side', category: 'Park', lat: 21.1280, lng: 79.0490, treesPlanted: 850, target: 1000, image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=300&q=80' },
  { id: 3, areaName: 'Academic Block', category: 'Street Trees', lat: 21.1230, lng: 79.0510, treesPlanted: 3420, target: 3500, image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=300&q=80' },
  { id: 4, areaName: 'Hostel Sector', category: 'Urban Forest', lat: 21.1200, lng: 79.0480, treesPlanted: 5200, target: 8000, image: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=300&q=80' },
  { id: 5, areaName: 'South Ambazari Road', category: 'Street Trees', lat: 21.1260, lng: 79.0550, treesPlanted: 415, target: 500, image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=80' }
];

export default function Dashboard() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setLocations(MOCK_DATA);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ['All', 'Urban Forest', 'Street Trees', 'Park'];

  const filteredLocations = selectedCategory === 'All' 
    ? locations 
    : locations.filter(loc => loc.category === selectedCategory);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      <TopNav 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onMenuToggle={() => console.log('Menu Toggled')}
      />

      <MapView 
        locations={filteredLocations} 
        selectedLocation={selectedLocation} 
        onMarkerClick={setSelectedLocation} 
      />
      
      <BottomPanel 
        locations={filteredLocations}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      />

    </div>
  );
}
