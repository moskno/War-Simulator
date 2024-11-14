import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DefenseDashboard from './pages/DefenseDashboard';
import AttackDashboard from './pages/AttackDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/defence' element={<DefenseDashboard/>}/>
        <Route path='/attack' element={<AttackDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App