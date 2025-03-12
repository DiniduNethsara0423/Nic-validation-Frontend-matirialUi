import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Home/DashboardPage';
import UploadCSVPage from './pages/Home/UploadCsvPage';
import GenerateReportsPage from './pages/Home/GenerateReportsPage';
import ShowAllNICsPage from './pages/Home/ShowAllNicPage';
import SearchByFileNamePage from './pages/Home/SearchByFileName';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadCSVPage />} />
        <Route path="/reports" element={<GenerateReportsPage />} />
        <Route path="/nics" element={<ShowAllNICsPage />} />
        <Route path="/search" element={<SearchByFileNamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
