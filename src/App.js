import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage'; // Assuming WelcomePage.js is in the same directory
import LoginPage from './pages/LoginPage'; // Assuming LoginPage.js is in the same directory
import Ask from './pages/Ask';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/ask' element={<Ask />} />
      </Routes>
    </Router>
  );
}

export default App;