import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, ArrowRight } from 'lucide-react';

export default function LinePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        padding: '24px',
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LineChart size={22} color="#10B981" />
          <h1 style={{ margin: 0, fontSize: '22px', color: '#0F172A' }}>Line Page</h1>
        </div>

        <p style={{ margin: 0, color: '#334155', fontWeight: 500 }}>
          View detailed tree analytics and map insights in the dashboard.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          style={{
            border: 'none',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '14px',
            padding: '12px 16px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            width: 'fit-content',
          }}
        >
          Open Dashboard
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
