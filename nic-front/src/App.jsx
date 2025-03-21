import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Home/DashboardPage';
import UploadCSVPage from './pages/Home/UploadCsvPage';
import GenerateReportsPage from './pages/Home/GenerateReportsPage';
import ShowAllNICsPage from './pages/Home/ShowAllNicPage';
import SearchByFileNamePage from './pages/Home/SearchByFileName';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Chat from "./pages/Home/Chat"

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadCSVPage />} />
        <Route path="/reports" element={<GenerateReportsPage />} />
        <Route path="/nics" element={<ShowAllNICsPage />} />
        <Route path="/search" element={<SearchByFileNamePage />} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </Router>
  );
}

export default App;
