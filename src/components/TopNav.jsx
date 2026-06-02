import React from 'react';
import { Map as MapIcon, Layers, Target, Settings, Menu } from 'lucide-react';

export default function TopNav({ categories, selectedCategory, onSelectCategory, onMenuToggle }) {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center', // Center the remaining action bar since logo is gone
      alignItems: 'center',
      pointerEvents: 'none' // Let clicks pass through empty space
    }}>
      {/* Center: Filters / Actions */}
      <div className="glass-card" style={{ padding: '8px 12px', display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
        {categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: selectedCategory === cat ? 'var(--text-main)' : 'transparent',
              color: selectedCategory === cat ? 'white' : 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {i === 0 && <MapIcon size={14} />}
            {i === 1 && <Layers size={14} />}
            {i === 2 && <Target size={14} />}
            {cat}
          </button>
        ))}
        <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.1)', margin: '0 8px', alignSelf: 'center' }}></div>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}><Settings size={16} /></button>
      </div>

      {/* Empty div for right side to maintain space-between flex layout if desired, though not strictly necessary */}
      <div style={{ width: '150px' }}></div>
    </div>
  );
}
