import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import Menu from "../assets/menu.png";
import Close from "../assets/close.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent text-white">
        <img src={Logo} alt="Logo" className="h-20 w-auto" />
        <ul className="hidden md:flex space-x-8 justify-center items-center flex-1">
          <li>
            <a href="#Header" className="cursor-pointer hover:text-orange-500 transition-colors">Home</a>
          </li>
          <li>
            <a href="#Historia" className="cursor-pointer hover:text-orange-500 transition-colors">História</a>
          </li>
          <li>
            <a href="#Pontos" className="cursor-pointer hover:text-orange-500 transition-colors">Pontos Turísticos</a>
          </li>
          <li>
            <a href="#Sobre" className="cursor-pointer hover:text-orange-500 transition-colors">Sobre</a>
          </li>
        </ul>

        <button className="hidden md:block px-4 py-2 border border-white rounded-lg cursor-pointer hover:bg-orange-500 hover:text-white transition-colors">
          Entrar
        </button>
        <img 
          src={open ? Close : Menu} 
          alt="Menu" 
          className="md:hidden w-7 cursor-pointer" 
          onClick={() => setOpen(!open)} 
        />
      </div>

      {/* ---------MENU MOBILE--------- */}
      <div className={`md:hidden fixed w-full right-0 top-0 bottom-0 overflow-hidden bg-white transition-all ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <img src={Close} alt="Fechar Menu" className="w-7 cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium text-black">
          <a href="#Header" className="px-4 py-2 rounded-full inline-block" onClick={() => setOpen(false)}>Home</a>
          <a href="#Sobre" className="px-4 py-2 rounded-full inline-block" onClick={() => setOpen(false)}>Sobre</a>
          <a href="#Pontos" className="px-4 py-2 rounded-full inline-block" onClick={() => setOpen(false)}>Pontos Turísticos</a>
          <a href="#Avaliacoes" className="px-4 py-2 rounded-full inline-block" onClick={() => setOpen(false)}>Avaliações</a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
