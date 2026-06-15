import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import Requirements from './components/Requirements';
import Footer from './components/Footer';
import Snow from './components/Snow';
import News from './components/News';
// 1. Import the Music Player
import MusicPlayer from './components/MusicPlayer'; 

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
      
      {/* 2. Add the Music Player here at the bottom */}
      <MusicPlayer />
    </div>
  );
}

export default App;