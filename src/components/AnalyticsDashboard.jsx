import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Download, FileSpreadsheet, FileText, ArrowLeft } from 'lucide-react';
import { MOCK_DATA } from '../data/locations';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

function getSummary(locations) {
  const totalPlanted = locations.reduce((sum, loc) => sum + loc.treesPlanted, 0);
  const totalTarget = locations.reduce((sum, loc) => sum + loc.target, 0);
  const completion = totalTarget > 0 ? Math.round((totalPlanted / totalTarget) * 100) : 0;
  return { totalPlanted, totalTarget, completion };
}

function getCategoryData(locations) {
  const grouped = locations.reduce((acc, loc) => {
    acc[loc.category] = (acc[loc.category] || 0) + loc.treesPlanted;
    return acc;
  }, {});
  return Object.entries(grouped).map(([category, planted]) => ({ category, planted }));
}

export default function AnalyticsDashboard() {
  const navigate = useNavigate();
  const locations = MOCK_DATA;
  const { totalPlanted, totalTarget, completion } = getSummary(locations);
  const categoryData = getCategoryData(locations);
  const totalCategoryPlanted = categoryData.reduce((sum, item) => sum + item.planted, 0);
  const chartColors = ['#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];
  const areaProgressData = locations.map((loc) => ({
    areaName: loc.areaName.length > 12 ? `${loc.areaName.slice(0, 12)}...` : loc.areaName,
    planted: loc.treesPlanted,
    target: loc.target,
    completion: Math.round((loc.treesPlanted / loc.target) * 100),
  }));
  const categoryPieData = categoryData.map((item) => ({
    name: item.category,
    value: item.planted,
  }));
  const trendData = [...locations]
    .sort((a, b) => a.id - b.id)
    .map((loc) => ({ name: `Zone ${loc.id}`, planted: loc.treesPlanted, target: loc.target }));
  const radarData = categoryData.map((item) => ({
    category: item.category,
    planted: item.planted,
    normalizedTarget: Math.round((item.planted / totalCategoryPlanted) * totalTarget),
  }));

  const reportRows = locations.map((loc) => ({
    'Area Name': loc.areaName,
    Category: loc.category,
    'Trees Planted': loc.treesPlanted,
    Target: loc.target,
    'Completion %': Math.round((loc.treesPlanted / loc.target) * 100),
  }));

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tree Report');
    XLSX.writeFile(wb, 'tree-dashboard-report.xlsx');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Tree Analytics Dashboard Report', 14, 18);
    doc.setFontSize(11);
    doc.text(`Total Planted: ${totalPlanted.toLocaleString()}`, 14, 28);
    doc.text(`Total Target: ${totalTarget.toLocaleString()}`, 14, 35);
    doc.text(`Global Completion: ${completion}%`, 14, 42);

    autoTable(doc, {
      startY: 50,
      head: [['Area Name', 'Category', 'Trees Planted', 'Target', 'Completion %']],
      body: reportRows.map((r) => [
        r['Area Name'],
        r.Category,
        r['Trees Planted'].toLocaleString(),
        r.Target.toLocaleString(),
        `${r['Completion %']}%`,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [15, 23, 42] },
    });

    doc.save('tree-dashboard-report.pdf');
  };

  return (
    <div className="analytics-page">
      <div className="analytics-wrap">
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', color: '#0F172A' }}>Dashboard Reports</h1>
            <p style={{ margin: '6px 0 0', color: '#64748B', fontWeight: 500 }}>
              Tree plantation analytics, charts, and downloadable reports.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <button
              onClick={() => navigate('/')}
              style={{ border: 'none', borderRadius: '10px', padding: '10px 14px', background: '#0f172a', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
            >
              <ArrowLeft size={16} />
              Back to Map
            </button>
            <button
              onClick={handleDownloadExcel}
              style={{ border: 'none', borderRadius: '10px', padding: '10px 14px', background: '#10B981', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
            >
              <FileSpreadsheet size={16} />
              Download Excel
            </button>
            <button
              onClick={handleDownloadPDF}
              style={{ border: 'none', borderRadius: '10px', padding: '10px 14px', background: '#2563EB', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
            >
              <FileText size={16} />
              Download PDF
            </button>
          </div>
        </div>

        <div className="analytics-kpi-grid">
          <div className="glass-card">
            <div style={{ color: '#64748B', fontWeight: 600, fontSize: '12px' }}>TOTAL PLANTED</div>
            <div style={{ fontSize: '30px', fontWeight: 800, marginTop: '6px' }}>{totalPlanted.toLocaleString()}</div>
          </div>
          <div className="glass-card">
            <div style={{ color: '#64748B', fontWeight: 600, fontSize: '12px' }}>TOTAL TARGET</div>
            <div style={{ fontSize: '30px', fontWeight: 800, marginTop: '6px' }}>{totalTarget.toLocaleString()}</div>
          </div>
          <div className="glass-card">
            <div style={{ color: '#64748B', fontWeight: 600, fontSize: '12px' }}>GLOBAL COMPLETION</div>
            <div style={{ fontSize: '30px', fontWeight: 800, marginTop: '6px' }}>{completion}%</div>
          </div>
        </div>

        <div className="analytics-grid-two">
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#0F172A' }}>Area vs Target (3D-style Bar Graph)</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <BarChart data={areaProgressData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                  <defs>
                    <linearGradient id="barGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="barBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                  <XAxis dataKey="areaName" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="planted" fill="url(#barGreen)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="target" fill="url(#barBlue)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#0F172A' }}>Category Distribution (Pie Graph)</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={categoryPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label>
                    {categoryPieData.map((entry, index) => (
                      <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="analytics-grid-equal">
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#0F172A' }}>Plantation Trend (Area Graph)</h3>
            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer>
                <AreaChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="planted" stroke="#0f766e" fillOpacity={1} fill="url(#areaFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#0F172A' }}>Category Strength (Radar Graph)</h3>
            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis tick={{ fontSize: 10 }} />
                  <Radar name="Planted" dataKey="planted" stroke="#2563eb" fill="#2563eb" fillOpacity={0.45} />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#0F172A' }}>Detailed Report Table</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '12px', fontWeight: 700 }}>
              <Download size={14} />
              Ready to download
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '780px' }}>
            <thead>
              <tr style={{ background: 'rgba(15, 23, 42, 0.06)' }}>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px' }}>Area</th>
                <th style={{ textAlign: 'left', padding: '10px', fontSize: '12px' }}>Category</th>
                <th style={{ textAlign: 'right', padding: '10px', fontSize: '12px' }}>Planted</th>
                <th style={{ textAlign: 'right', padding: '10px', fontSize: '12px' }}>Target</th>
                <th style={{ textAlign: 'right', padding: '10px', fontSize: '12px' }}>Completion</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => {
                const pct = Math.round((loc.treesPlanted / loc.target) * 100);
                return (
                  <tr key={loc.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                    <td style={{ padding: '10px', fontSize: '13px', fontWeight: 600 }}>{loc.areaName}</td>
                    <td style={{ padding: '10px', fontSize: '13px', color: '#475569' }}>{loc.category}</td>
                    <td style={{ padding: '10px', textAlign: 'right', fontSize: '13px' }}>{loc.treesPlanted.toLocaleString()}</td>
                    <td style={{ padding: '10px', textAlign: 'right', fontSize: '13px' }}>{loc.target.toLocaleString()}</td>
                    <td style={{ padding: '10px', textAlign: 'right', fontSize: '13px', fontWeight: 700, color: pct >= 90 ? '#059669' : '#b45309' }}>{pct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
