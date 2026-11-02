import React, { useState, useEffect } from 'react';
import MapView from './Map';
import TopNav from './TopNav';
import BottomPanel from './BottomPanel';
import { MOCK_DATA } from '../data/locations';

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
