import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Nav from './components/Nav';
import Input from './components/Input';

function App() {
  return (
    <>
      <div className="h-dvh w-screen flex">
        <Nav />
        <div className="w-full">
          <header className="flex items-center h-12 px-2 border-b border-dark/10 dark:border-light/10">
            Titre de la conversation
          </header>
          <main className="pl-[260px] relative">
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
