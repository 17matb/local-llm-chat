import { Plus, Users } from 'lucide-react';
import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  const mainControls = [
    {
      label: 'Liste des utilisateurs',
      icon: Users,
      path: '/admin/users-list',
    },
    {
      label: 'Ajouter un utilisateur',
      icon: Plus,
      path: '/admin/add-user',
    },
  ];

  return (
    <div className="h-dvh w-full flex">
      <Nav
        mainControls={mainControls}
        adminButton={{ label: 'Retour au chat', path: '/chat' }}
      />
      <Outlet />
    </div>
  );
};

export default Admin;
