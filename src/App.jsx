import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LinePage from './components/LinePage';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<AnalyticsDashboard />} />
      <Route path="/line" element={<LinePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
