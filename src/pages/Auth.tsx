import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const texts = {
    fr: {
      login: 'Connexion',
      signup: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      fullName: 'Nom complet',
      signInButton: 'Se connecter',
      signUpButton: "S'inscrire",
      switchToSignup: "Pas de compte ? S'inscrire",
      switchToLogin: 'Déjà un compte ? Se connecter',
      loginDescription: 'Connectez-vous à votre compte administrateur',
      signupDescription: 'Créer un nouveau compte administrateur',
      successSignup: 'Compte créé avec succès ! Vérifiez votre email.',
      errorInvalidCredentials: 'Email ou mot de passe incorrect',
      errorEmailExists: 'Un compte existe déjà avec cet email',
      errorWeakPassword: 'Le mot de passe doit contenir au moins 6 caractères',
      errorGeneric: 'Une erreur est survenue. Veuillez réessayer.',
      backToSite: 'Retour au site'
    },
    en: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      signInButton: 'Sign In',
      signUpButton: 'Sign Up',
      switchToSignup: 'No account? Sign up',
      switchToLogin: 'Already have an account? Sign in',
      loginDescription: 'Sign in to your admin account',
      signupDescription: 'Create a new admin account',
      successSignup: 'Account created successfully! Check your email.',
      errorInvalidCredentials: 'Invalid email or password',
      errorEmailExists: 'An account already exists with this email',
      errorWeakPassword: 'Password must be at least 6 characters',
      errorGeneric: 'An error occurred. Please try again.',
      backToSite: 'Back to site'
    }
  };

  const t = texts[language];

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError(t.errorInvalidCredentials);
          } else {
            setError(t.errorGeneric);
          }
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            setError(t.errorEmailExists);
          } else if (error.message.includes('Password should be at least')) {
            setError(t.errorWeakPassword);
          } else {
            setError(t.errorGeneric);
          }
        } else {
          setSuccess(t.successSignup);
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            ← {t.backToSite}
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? t.login : t.signup}</CardTitle>
            <CardDescription>
              {isLogin ? t.loginDescription : t.signupDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Input
                    type="text"
                    placeholder={t.fullName}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div>
                <Input
                  type="email"
                  placeholder={t.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder={t.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? '...' : (isLogin ? t.signInButton : t.signUpButton)}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                }}
              >
                {isLogin ? t.switchToSignup : t.switchToLogin}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;