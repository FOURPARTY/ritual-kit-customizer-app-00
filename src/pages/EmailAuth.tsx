import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

const EmailAuth = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    return email.includes('@') && email.includes('.') && email.length > 5;
  };

  const handleContinue = () => {
    if (email === 'cliente@teste.com') {
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="pt-8 px-6">
        <Button
          onClick={handleBack}
          variant="ghost"
          size="icon"
          className="mb-8"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Ebo Ayo</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-md mx-auto w-full">
        <div className="space-y-8">
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
              className="h-14 text-base border-2 border-gray-200 focus:border-primary"
              autoFocus
            />

            <Button
              onClick={handleContinue}
              disabled={!isValidEmail(email)}
              size="lg"
              className="w-full h-14 text-base font-medium bg-primary hover:bg-primary/90 disabled:bg-gray-300"
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
