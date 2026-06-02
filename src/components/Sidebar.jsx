import React from 'react';
import { Search, Trees, Target, Activity } from 'lucide-react';

export default function Sidebar({ locations, selectedCategory, onSelectCategory, onSelectLocation, isOpen }) {
  const categories = ['All', 'Urban Forest', 'Street Trees', 'Park', 'Conservation'];

  const totalPlanted = locations.reduce((sum, loc) => sum + loc.treesPlanted, 0);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      maxWidth: '440px',
      height: '100%',
      zIndex: 10,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      pointerEvents: 'none',
      transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      opacity: isOpen ? 1 : 0
    }}>
      <div className="glass-panel" style={{ 
        flex: 1, 
        borderRadius: 'var(--radius-lg)',
        padding: '32px 24px',
        pointerEvents: 'auto',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        
        {/* Header & Global Stats */}
        <div className="flex-col animate-fade-in" style={{ gap: '16px' }}>
          <div>
            <h1 className="text-display">Global Canopy</h1>
            <p className="text-body" style={{ marginTop: '4px' }}>Tracking our reforestation initiatives.</p>
          </div>
          
          <div className="glass-card flex-row justify-between" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', color: 'white', border: 'none' }}>
            <div className="flex-col" style={{ gap: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', opacity: 0.8 }}>Total Trees Planted</span>
              <span style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1 }}>{totalPlanted.toLocaleString()}</span>
            </div>
            <Trees size={40} opacity={0.5} />
          </div>

          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '20px', top: '15px', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="text" 
              className="glass-input" 
              placeholder="Search planting areas..." 
              style={{ paddingLeft: '48px' }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex-row animate-fade-in" style={{ overflowX: 'auto', paddingBottom: '8px', animationDelay: '0.1s' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
              style={{ flexShrink: 0 }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Places List */}
        <div className="flex-col animate-fade-in" style={{ overflowY: 'auto', flex: 1, paddingRight: '8px', gap: '16px', animationDelay: '0.2s' }}>
          <div className="flex-row justify-between" style={{ alignItems: 'center' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Planting Zones</p>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '12px' }}>{locations.length} Areas</span>
          </div>

          {locations.map((loc, index) => {
            const progress = (loc.treesPlanted / loc.target) * 100;
            return (
              <div 
                key={loc.id} 
                className="glass-card flex-row"
                style={{ cursor: 'pointer', padding: '16px', gap: '16px', animationDelay: `${0.3 + index * 0.05}s` }}
                onClick={() => onSelectLocation(loc)}
              >
                <img 
                  src={loc.image} 
                  alt={loc.areaName} 
                  style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />
                <div className="flex-col" style={{ gap: '6px', flex: 1 }}>
                  <h3 className="text-headline">{loc.areaName}</h3>
                  
                  <div className="flex-row justify-between" style={{ marginTop: '2px' }}>
                    <div className="flex-row" style={{ gap: '4px', color: 'var(--primary-dark)' }}>
                      <Trees size={14} />
                      <span className="text-body" style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{loc.treesPlanted.toLocaleString()}</span>
                    </div>
                    <div className="flex-row" style={{ gap: '4px', color: 'var(--text-muted)' }}>
                      <Target size={14} />
                      <span className="text-body" style={{ fontSize: '12px' }}>{loc.target.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden', marginTop: '4px' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-light), var(--primary))', borderRadius: '3px' }} />
                  </div>
                  
                  <div className="flex-row" style={{ gap: '4px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <Activity size={12} />
                    <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>{loc.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {locations.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Trees size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p className="text-headline">No areas found</p>
              <p className="text-body" style={{ marginTop: '8px' }}>Try selecting a different filter.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
