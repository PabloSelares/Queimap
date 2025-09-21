import Logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent text-white">
        <img src={Logo} alt="Logo" className="h-20 w-auto" />
        
        <ul className="flex space-x-8 justify-center items-center flex-1">
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
            <a href="#Sobre" className="cursor-pointer hover:text-orange-500 transition-colors">Sobre Nós</a>
          </li>
        </ul>

        <button className="px-4 py-2 border border-white rounded-lg cursor-pointer hover:bg-orange-500 hover:text-white transition-colors">
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Navbar;
