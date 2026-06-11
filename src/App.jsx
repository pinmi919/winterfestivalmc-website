import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import Requirements from './components/Requirements';
import Footer from './components/Footer';
import Snow from './components/Snow';
import News from './components/News';

function App() {
  return (
    <div className="relative">
      <Snow />
      <Navbar />
      <Hero />
      <News />
      <Schedule />
      <Requirements />
      <Footer />
    </div>
  );
}

export default App;