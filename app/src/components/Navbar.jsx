import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import Menu from "../assets/menu.png";
import Close from "../assets/close.png";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { auth } from "../services/Auth";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLoginModal(false);
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent text-white">
        <img src={Logo} alt="Logo" className="h-20 w-auto" />
        <ul className="hidden md:flex space-x-8 justify-center items-center flex-1">
          <li><a href="#Header" className="cursor-pointer hover:text-orange-500 transition-colors">Home</a></li>
          <li><a href="#Historia" className="cursor-pointer hover:text-orange-500 transition-colors">História</a></li>
          <li><a href="#Pontos" className="cursor-pointer hover:text-orange-500 transition-colors">Pontos Turísticos</a></li>
          <li><a href="#Sobre" className="cursor-pointer hover:text-orange-500 transition-colors">Sobre</a></li>
        </ul>

        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span>Olá, {user?.name || user?.email}</span>
            <button onClick={handleLogout} className="px-4 py-2 border border-white rounded-lg cursor-pointer hover:bg-orange-500 hover:text-white transition-colors">
              Sair
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4">
            <button onClick={() => setShowRegisterModal(true)} className="px-4 py-2 border border-white rounded-lg cursor-pointer hover:bg-orange-500 hover:text-white transition-colors">
              Criar Conta
            </button>
            <button onClick={() => setShowLoginModal(true)} className="px-4 py-2 border border-white rounded-lg cursor-pointer hover:bg-orange-500 hover:text-white transition-colors">
              Entrar
            </button>
          </div>
        )}

        <img src={open ? Close : Menu} alt="Menu" className="md:hidden w-7 cursor-pointer" onClick={() => setOpen(!open)} />
      </div>

      {/* Modais */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => { setShowLoginModal(false); setShowRegisterModal(true); }}
        onLoginSuccess={handleLoginSuccess}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => { setShowRegisterModal(false); setShowLoginModal(true); }}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* Menu Mobile */}
      <div className={`md:hidden fixed w-full right-0 top-0 bottom-0 overflow-hidden bg-white transition-all ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <img src={Close} alt="Fechar Menu" className="w-7 cursor-pointer" onClick={() => setOpen(false)} />
        </div>
        <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium text-black">
          <a href="#Header" className="px-4 py-2 rounded-full inline-block" onClick={() => setOpen(false)}>Home</a>
          <a href="#Sobre" className="px-4 py-2 rounded-full inline-block" onClick={() => setOpen(false)}>Sobre</a>
          <a href="#Pontos" className="px-4 py-2 rounded-full inline-block" onClick={() => setOpen(false)}>Pontos Turísticos</a>
          <a href="#Avaliacoes" className="px-4 py-2 rounded-full inline-block" onClick={() => setOpen(false)}>Avaliações</a>
          {!isLoggedIn && (
            <>
              <button onClick={() => { setShowRegisterModal(true); setOpen(false); }} className="px-4 py-2 border border-orange-500 text-orange-500 rounded-full inline-block">
                Criar Conta
              </button>
              <button onClick={() => { setShowLoginModal(true); setOpen(false); }} className="px-4 py-2 bg-orange-500 text-white rounded-full inline-block">
                Entrar
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;