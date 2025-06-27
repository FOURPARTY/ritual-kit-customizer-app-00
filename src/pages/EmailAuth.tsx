import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

const EmailAuth = () => {
  const [email, setEmail] = useState('');
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isValidEmail = (email: string) => {
    return email.includes('@') && email.includes('.') && email.length > 5;
  };

  const handleContinue = () => {
    if (email === 'teste@teste.com') {
      // Test user - go to login
      navigate('/auth/login', { state: { email } });
    } else if (email === 'cliente@teste.com') {
      // Existing user - go to login  
      navigate('/auth/login', { state: { email } });
    } else {
      // New user - go to signup
      navigate('/auth/signup', { state: { email } });
    }
  };

  const handleBack = () => {
    navigate('/auth/welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/10 flex flex-col relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className={`pt-8 px-6 relative z-10 transition-all duration-600 ease-out ${
        showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}>
        <Button
          onClick={handleBack}
          variant="ghost"
          size="icon"
          className="mb-8 hover:bg-white/50 transition-all duration-200 active:scale-[0.95]"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Ebo Ayo</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-md mx-auto w-full relative z-10">
        <div className={`space-y-8 transition-all duration-800 ease-out delay-200 ${
          showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Qual o seu e-mail?
            </h2>
          </div>

          <div className="space-y-6">
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 text-base border-2 border-gray-200 focus:border-primary transition-all duration-200 bg-white/80 backdrop-blur-sm"
              autoFocus
            />

            <Button
              onClick={handleContinue}
              disabled={!isValidEmail(email)}
              size="lg"
              className="w-full h-14 text-base font-medium bg-primary hover:bg-primary/90 disabled:bg-gray-300 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Space */}
      <div className="pb-8"></div>
    </div>
  );
};

export default EmailAuth;
