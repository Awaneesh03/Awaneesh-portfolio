import React, { useState, useEffect } from 'react';
import { BootSequence } from './components/BootSequence';
import { LoginScreen } from './components/LoginScreen';
import { Desktop } from './components/Desktop';
import { SystemPhase } from './types';

function App() {
  const [phase, setPhase] = useState<SystemPhase>('boot-splash');

  // Boot orchestration
  useEffect(() => {
    if (phase === 'boot-splash') {
      const timer = setTimeout(() => {
        setPhase('boot-progress');
      }, 1000); // 1s splash
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleBootComplete = () => {
    setPhase('login');
  };

  const handleLogin = () => {
    setPhase('desktop');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-mac-text font-sans antialiased selection:bg-mac-highlight selection:text-black">
      {/* Boot Phases */}
      {(phase === 'boot-splash' || phase === 'boot-progress') && (
        <BootSequence phase={phase} onComplete={handleBootComplete} />
      )}

      {/* Login Screen */}
      {phase === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {/* Desktop Environment */}
      {phase === 'desktop' && (
        <Desktop />
      )}
    </div>
  );
}

export default App;