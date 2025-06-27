import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(false);
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Sequência de animações cinematográficas
    const logoTimer = setTimeout(() => setShowLogo(true), 200);
    const textTimer = setTimeout(() => setShowWelcomeText(true), 1200);
    const buttonsTimer = setTimeout(() => setShowButtons(true), 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // Simulate immediate social login success
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('loginMethod', provider);
    navigate('/home', { replace: true });
  };

  const handleEmailFlow = () => {
    navigate('/auth/email');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/10 flex flex-col relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header with animated logo */}
      <div className="pt-20 pb-8 text-center relative z-10">
        <div className={`transition-all duration-1000 ease-out ${
          showLogo ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <h1 className="text-5xl font-bold text-primary mb-4 tracking-tight">Ebo Ayo</h1>
        </div>
        
        <div className={`transition-all duration-1000 ease-out delay-300 ${
          showWelcomeText ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <p className="text-xl text-gray-700 font-medium max-w-md mx-auto leading-relaxed">
            Bem-vindo ao Ebo Ayo.<br />
            <span className="text-primary">Sua jornada de fé começa aqui.</span>
          </p>
        </div>
      </div>

      {/* Main Content with animated buttons */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-md mx-auto w-full relative z-10">
        <div className={`space-y-4 transition-all duration-800 ease-out ${
          showButtons ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          {/* Google Login */}
          <Button
            onClick={() => handleSocialLogin('google')}
            variant="outline"
            size="lg"
            className="w-full h-14 text-base font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full"></div>
              Continuar com Google
            </div>
          </Button>

          {/* Apple Login */}
          <Button
            onClick={() => handleSocialLogin('apple')}
            variant="outline"
            size="lg"
            className="w-full h-14 text-base font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-black rounded-sm"></div>
              Continuar com Apple
            </div>
          </Button>

          {/* Email Flow */}
          <div className="pt-4">
            <Button
              onClick={handleEmailFlow}
              variant="ghost"
              size="lg"
              className="w-full text-gray-600 hover:text-gray-900 font-normal transition-all duration-200 hover:bg-gray-100/50 active:scale-[0.98]"
            >
              Continuar com E-mail
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Space */}
      <div className="pb-8"></div>
    </div>
  );
};

export default Welcome;
