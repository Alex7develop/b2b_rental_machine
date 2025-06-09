import type { FC } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import './styles/global.scss';

const App: FC = () => {
  return (
    <div className="app">
      <Header />
      
      <main>
        <Hero />
        <HowItWorks />
        
        <section className="why-us">
          {/* Здесь будет секция "Почему мы" */}
        </section>
      </main>
      
      <footer className="footer">
        {/* Здесь будет подвал сайта */}
      </footer>
    </div>
  );
};

export default App; 