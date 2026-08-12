import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import News from './components/News';
import Schedule from './components/Schedule';
import Creators from './components/Creators';
import Systems from './components/Systems';
import Requirements from './components/Requirements';
import Footer from './components/Footer';
import Snow from './components/Snow';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <div className="relative">
      <Snow />
      <Navbar />
      <Hero />
      <About />
      <News />
      <Schedule />
      <Creators />
      <Systems />
      <Requirements />
      <Footer />
      <MusicPlayer />
    </div>
  );
}

export default App;
