import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import UploadCSVPage from './pages/UploadCsvPage';
import GenerateReportsPage from './pages/GenerateReportsPage';
import ShowAllNICsPage from './pages/ShowAllNicPage';
import SearchByFileNamePage from './pages/SearchByFileName';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadCSVPage />} />
        <Route path="/reports" element={<GenerateReportsPage />} />
        <Route path="/nics" element={<ShowAllNICsPage />} />
        <Route path="/search" element={<SearchByFileNamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
