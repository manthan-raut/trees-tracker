import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { renderToString } from 'react-dom/server';
import { Trees } from 'lucide-react';

// Create a custom modern marker icon using DivIcon
const createCustomIcon = () => {
  const iconHtml = renderToString(
    <div className="marker-inner" style={{
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

const customIcon = createCustomIcon();

function MapController({ selectedLocation }) {
  const map = useMap();
  const prevSelectionId = React.useRef(null);

  React.useEffect(() => {
    const stopAnimation = () => map.stop();
    map.on('zoomstart', stopAnimation);
    map.on('dragstart', stopAnimation);
    map.on('mousedown', stopAnimation);
    return () => {
      map.off('zoomstart', stopAnimation);
      map.off('dragstart', stopAnimation);
      map.off('mousedown', stopAnimation);
    };
  }, [map]);

  React.useEffect(() => {
    if (!selectedLocation) {
      prevSelectionId.current = null;
      return;
    }
    if (prevSelectionId.current === selectedLocation.id) return;
    prevSelectionId.current = selectedLocation.id;

    map.flyTo([selectedLocation.lat, selectedLocation.lng], 16, {
      duration: 0.8,
      easeLinearity: 0.25,
    });
  }, [selectedLocation, map]);

  return null;
}

export default function MapView({ locations, selectedLocation, onMarkerClick }) {
  const defaultCenter = [21.1230, 79.0510]; // VNIT Nagpur

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <MapContainer
        center={defaultCenter}
        zoom={14}
        zoomControl={false}
        attributionControl={false}
        style={{ width: '100%', height: '100%', background: '#e2e8f0' }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap (Standard)">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap (Humanitarian / HOT)">
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by Humanitarian OpenStreetMap Team'
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenTopoMap">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
              maxZoom={17}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Modern (Carto Voyager)">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">Carto</a>'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Satellite + Roads (Hybrid)">
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              maxZoom={20}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite (Esri)">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri'
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={customIcon}
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
        <MapController selectedLocation={selectedLocation} />
      </MapContainer>
    </div>
  );
}
