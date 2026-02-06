import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './Chat';
import Admin from './Admin';
import UsersList from './UsersList';
import Auth from './Auth';
import AddUser from './AddUser';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<Auth />} />
          <Route path="chat" element={<Chat />} />
          <Route path="admin" element={<Admin />}>
            <Route path="users-list" element={<UsersList />} />
            <Route path="add-user" element={<AddUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
