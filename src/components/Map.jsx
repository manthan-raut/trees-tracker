import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { renderToString } from 'react-dom/server';
import { Trees } from 'lucide-react';

// Create a custom modern marker icon using DivIcon
const createCustomIcon = () => {
  const iconHtml = renderToString(
    <div style={{
      width: '32px',
      height: '32px',
      background: '#0F172A',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      border: '3px solid white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <Trees size={16} />
    </div>
  );

  return L.divIcon({
    className: 'custom-marker-modern',
    html: iconHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

function MapController({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapView({ locations, selectedLocation, onMarkerClick }) {
  const defaultCenter = [21.1230, 79.0510]; // VNIT Nagpur
  const center = selectedLocation
    ? [selectedLocation.lat, selectedLocation.lng]
    : (locations.length > 0 ? [locations[0].lat, locations[0].lng] : defaultCenter);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <MapContainer
        center={center}
        zoom={14}
        zoomControl={false}
        attributionControl={false}
        style={{ width: '100%', height: '100%', background: '#0F172A' }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Modern (Carto Voyager)">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite (Esri)">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={createCustomIcon()}
            eventHandlers={{
              click: () => onMarkerClick(loc)
            }}
          >
            <Popup className="premium-popup">
              <div style={{ fontFamily: 'Rubik, sans-serif' }}>
                <h3 style={{ margin: 0, fontWeight: 700, fontSize: '16px', color: '#0F172A' }}>{loc.areaName}</h3>
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#10B981', fontWeight: 800, fontSize: '14px' }}>{loc.treesPlanted.toLocaleString()}</span>
                  <span style={{ color: '#64748B', fontSize: '12px', fontWeight: 500 }}>trees planted</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapController center={center} zoom={selectedLocation ? 16 : 14} />
      </MapContainer>
    </div>
  );
}
