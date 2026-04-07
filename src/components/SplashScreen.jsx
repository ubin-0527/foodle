import logo from '../assets/logo.png';
import './SplashScreen.css';

export default function SplashScreen({ onStart }) {
  return (
    <div className="splash-screen">
      <div className="splash-inner">
        <div className="splash-logo">
          <img src={logo} alt="foodle" className="splash-logo-mark" />
          <p className="splash-subtitle">What's in my fridge?</p>
        </div>
        <button className="splash-start-btn" onClick={onStart}>
          Get Started
        </button>
      </div>
    </div>
  );
}
