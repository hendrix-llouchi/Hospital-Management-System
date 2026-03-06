import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import NurseDashboard from './pages/NurseDashboard/NurseDashboard';
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard';
import PharmacistDashboard from './pages/PharmacistDashboard/PharmacistDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/nurse" element={<NurseDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/pharmacist" element={<PharmacistDashboard />} />

        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Fallback for 404s */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
