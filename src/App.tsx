import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ThanksPage from './pages/ThanksPage';
import { useUTMTracking } from './hooks/useUTMTracking';
import './styles/global.scss';

function App() {
  // Автоматически отслеживаем UTM параметры
  useUTMTracking();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thanks" element={<ThanksPage />} />
      </Routes>
    </Router>
  );
}

export default App; 