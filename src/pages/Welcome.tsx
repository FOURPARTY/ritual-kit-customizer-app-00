
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const navigate = useNavigate();

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // Simulate immediate social login success
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('loginMethod', provider);
    navigate('/', { replace: true });
  };

  const handleEmailFlow = () => {
    navigate('/auth/email');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="pt-16 pb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Ebo Ayo</h1>
        <p className="text-xl text-gray-600 font-medium">
          Sua fé, entregue com respeito.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-md mx-auto w-full">
        <div className="space-y-4">
          {/* Google Login */}
          <Button
            onClick={() => handleSocialLogin('google')}
            variant="outline"
            size="lg"
            className="w-full h-14 text-base font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
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
            className="w-full h-14 text-base font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
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
              className="w-full text-gray-600 hover:text-gray-900 font-normal"
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
