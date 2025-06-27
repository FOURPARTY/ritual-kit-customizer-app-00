import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    // Validação específica para teste@teste.com
    if (email === 'teste@teste.com' && password !== 'teste@123') {
      setPasswordError('Senha incorreta.');
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setPasswordError('');
      }, 2000);
      return;
    }

    // Para outros emails, qualquer senha funciona (comportamento original)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('loginMethod', 'email');
    navigate('/home', { replace: true });
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
              Olá de volta!
            </h2>
            <p className="text-gray-600">{email}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className={`relative transition-all duration-200 ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-14 text-base border-2 focus:border-primary pr-12 transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                    passwordError ? 'border-red-500 focus:border-red-500' : 'border-gray-200'
                  }`}
                  autoFocus
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
              {passwordError && (
                <p className="text-red-500 text-sm ml-1 animate-fade-in">{passwordError}</p>
              )}
            </div>

            <div className="text-right">
              <Button variant="link" className="text-primary p-0 h-auto hover:underline transition-all duration-200">
                Esqueci minha senha
              </Button>
            </div>

            <Button
              onClick={handleLogin}
              disabled={password.length === 0}
              size="lg"
              className="w-full h-14 text-base font-medium bg-primary hover:bg-primary/90 disabled:bg-gray-300 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Space */}
      <div className="pb-8"></div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default Login;
