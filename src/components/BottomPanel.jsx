import React from 'react';
import { ArrowLeft, ArrowRight, User, TrendingUp, Activity } from 'lucide-react';

export default function BottomPanel({ locations, selectedLocation, onSelectLocation }) {
  const totalPlanted = locations.reduce((sum, loc) => sum + loc.treesPlanted, 0);
  const totalTarget = locations.reduce((sum, loc) => sum + loc.target, 0);

  // Categorical Data for the rightmost panel
  const categories = locations.reduce((acc, loc) => {
    acc[loc.category] = (acc[loc.category] || 0) + loc.treesPlanted;
    return acc;
  }, {});

  const totalCatTrees = Object.values(categories).reduce((sum, val) => sum + val, 0);

  // If no location is selected, just use the first one or a default state
  const displayLocation = selectedLocation || locations[0];

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'grid',
      gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr 1fr 1.2fr',
      gap: '16px',
      pointerEvents: 'none' // allow clicks between cards
    }}>

      {/* 1. Selected Location Detail Card */}
      <div className="glass-card" style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{displayLocation ? displayLocation.areaName : 'Select an Area'}</h2>
          <span style={{ background: '#F59E0B', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Active</span>
        </div>

        {displayLocation && (
          <>
            <div style={{ display: 'flex', gap: '12px' }}>
              <img src={displayLocation.image} alt={displayLocation.areaName} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--text-muted)' }}>Category:</span> <span style={{ fontWeight: 600 }}>{displayLocation.category}</span></div>
                <div style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--text-muted)' }}>Target:</span> <span style={{ fontWeight: 600 }}>{displayLocation.target.toLocaleString()}</span></div>
                <div style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--text-muted)' }}>Planted:</span> <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{displayLocation.treesPlanted.toLocaleString()}</span></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={14} color="#64748B" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>Manager: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Manthan Raut</span></span>
            </div>
          </>
        )}
      </div>

      {/* 2. Circular Stats (Simulated with text/simple progress for now) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', pointerEvents: 'none' }}>
        <div className="glass-card" style={{ flex: 1, pointerEvents: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>Survival Rate</span>
            <span>Est.</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 400, marginTop: '8px', letterSpacing: '-1px' }}>
            94<span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>%</span>
          </div>
          <div style={{ marginTop: 'auto', height: '60px', borderBottom: '4px solid #F59E0B', borderRadius: '50% 50% 0 0', opacity: 0.8, position: 'relative', overflow: 'hidden' }}>
            {/* Simple curved arc visual */}
            <div style={{ position: 'absolute', bottom: -10, left: '10%', right: '10%', height: '40px', border: '2px solid #e2e8f0', borderBottom: 'none', borderRadius: '50% 50% 0 0' }}></div>
            <div style={{ position: 'absolute', bottom: -10, left: '10%', right: '20%', height: '40px', border: '3px solid #F59E0B', borderBottom: 'none', borderRadius: '50% 50% 0 0' }}></div>
          </div>
        </div>
        <div className="glass-card" style={{ flex: 1, pointerEvents: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>Target Progress</span>
            <span>Global</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 400, marginTop: '8px', letterSpacing: '-1px' }}>
            {Math.round((totalPlanted / totalTarget) * 100)}<span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>%</span>
          </div>
          <div style={{ marginTop: 'auto', height: '60px', borderBottom: '4px solid var(--primary)', borderRadius: '50% 50% 0 0', opacity: 0.8, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: -10, left: '10%', right: '10%', height: '40px', border: '2px solid #e2e8f0', borderBottom: 'none', borderRadius: '50% 50% 0 0' }}></div>
            <div style={{ position: 'absolute', bottom: -10, left: '10%', right: '40%', height: '40px', border: '3px solid var(--primary)', borderBottom: 'none', borderRadius: '50% 50% 0 0' }}></div>
          </div>
        </div>
      </div>

      {/* 3. Global Numeric Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', pointerEvents: 'none' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'row', gap: '16px', pointerEvents: 'auto' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Planted</div>
            <div style={{ fontSize: '32px', fontWeight: 400, letterSpacing: '-1px' }}>{totalPlanted.toLocaleString()}</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Active Zones</div>
            <div style={{ fontSize: '32px', fontWeight: 400, letterSpacing: '-1px' }}>{locations.length}</div>
          </div>
        </div>
        <div className="glass-card" style={{ flex: 1, pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <TrendingUp color="var(--primary)" size={24} />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Planting velocity is up <strong style={{ color: 'var(--text-main)' }}>12%</strong> this month across all managed sectors.
          </div>
        </div>
      </div>

      {/* 4. Categorical Performance Overview */}
      <div className="glass-card" style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '24px' }}>Category Distribution</h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          {Object.entries(categories).slice(0, 4).map(([name, val], i) => {
            const pct = Math.round((val / totalCatTrees) * 100);
            return (
              <div key={name} style={{ textAlign: i === 3 ? 'right' : i === 0 ? 'left' : 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>{pct}%</div>
              </div>
            );
          })}
        </div>

        {/* Multi-colored Progress Bar */}
        <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
          {Object.entries(categories).slice(0, 4).map(([name, val], i) => {
            const pct = (val / totalCatTrees) * 100;
            const colors = ['#3B82F6', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'];
            return <div key={name} style={{ width: `${pct}%`, background: colors[i % colors.length] }}></div>;
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
          {Object.entries(categories).slice(0, 4).map(([name], i) => (
            <div key={name} style={{ textAlign: i === 3 ? 'right' : i === 0 ? 'left' : 'center', maxWidth: '60px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
          ))}
        </div>
      </div>

    </div>
  );
}
