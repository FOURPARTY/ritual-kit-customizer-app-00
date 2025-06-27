
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isPasswordValid = password.length >= 8;
  const canSubmit = fullName.length > 0 && isPasswordValid && acceptedTerms;

  const handleSignup = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', fullName);
    localStorage.setItem('loginMethod', 'email');
    navigate('/', { replace: true });
  };

  const handleBack = () => {
    navigate('/auth/email');
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
              Falta pouco para completar seu cadastro.
            </h2>
          </div>

          <div className="space-y-6">
            <Input
              type="email"
              value={email}
              disabled
              className="h-14 text-base border-2 border-gray-200 bg-gray-100/50"
            />

            <Input
              type="text"
              placeholder="Nome completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-14 text-base border-2 border-gray-200 focus:border-primary transition-all duration-200 bg-white/80 backdrop-blur-sm"
            />

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Criar uma senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 text-base border-2 border-gray-200 focus:border-primary pr-12 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100/50 transition-all duration-200 active:scale-[0.95]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className={`text-sm transition-colors duration-200 ${isPasswordValid ? 'text-green-600' : 'text-gray-500'}`}>
                Mínimo 8 caracteres
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-5">
                Li e aceito os{' '}
                <Button variant="link" className="p-0 h-auto text-sm font-semibold text-primary hover:underline">
                  Termos de Serviço
                </Button>{' '}
                e a{' '}
                <Button variant="link" className="p-0 h-auto text-sm font-semibold text-primary hover:underline">
                  Política de Privacidade
                </Button>
              </label>
            </div>

            <Button
              onClick={handleSignup}
              disabled={!canSubmit}
              size="lg"
              className="w-full h-14 text-base font-medium bg-primary hover:bg-primary/90 disabled:bg-gray-300 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            >
              Criar Conta
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Space */}
      <div className="pb-8"></div>
    </div>
  );
};

export default Signup;
