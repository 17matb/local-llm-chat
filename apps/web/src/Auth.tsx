import { useState } from 'react';
import { Button } from './components/ui/Button';
import TextInput from './components/ui/TextInput';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('Identifiants invalides');
      }

      const data = await response.json();

      localStorage.setItem('token', data.access_token);
      navigate('/chat');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur imprévue est survenue');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-dvh w-full">
      <div className="w-full max-w-[350px] squircle-md">
        <p className="text-2xl">Se connecter</p>
        <p className="text-sm text-fg-subtle">
          Connectez-vous à votre espace professionnel
        </p>
        <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-sm text-fg-subtle">
              Nom d'utilisateur
            </label>
            <TextInput
              placeholder="Nom d'utilisateur"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-fg-subtle">
              Mot de passe
            </label>
            <TextInput
              placeholder="Mot de passe"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="default"
            size="default"
            className="mt-2"
            type="submit"
          >
            Connexion
          </Button>
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Auth;
