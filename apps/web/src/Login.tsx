import Button from './components/ui/Button';
import TextInput from './components/ui/TextInput';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh w-full">
      <div className="w-full max-w-[350px] border border-dark/10 dark:border-light/10 bg-darker-light dark:bg-darker-dark p-6 squircle rounded-[4rem]">
        <p className="text-2xl">Se connecter</p>
        <p className="text-sm opacity-75">
          Connectez-vous à votre espace professionnel
        </p>
        <form className="flex flex-col gap-2 mt-4">
          <TextInput placeholder="Nom d'utilisateur" />
          <TextInput placeholder="Mot de passe" />
          <Button variant="largeClassicPrimary" className="mt-2" type="submit">
            Connexion
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
