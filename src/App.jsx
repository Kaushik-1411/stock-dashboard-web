import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar';
import Logo from './components/Logo';
import { COLORS } from './constants/Theme';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Logo />
    </div>
  );
}

export default App;
