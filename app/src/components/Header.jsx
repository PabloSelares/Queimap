import React from "react";
import Banner from "../assets/Banner.png";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div
      className="h-[90vh] mb-4 bg-cover bg-center flex items-center w-full overflow-hidden"
      style={{ backgroundImage: `url(${Banner})` }}
      id="Header"
    >

      <div className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white">
        <h2 className="text-5xl sm:text-6xl md:text-[75px] inline-block max-w-3xl font-semibold pt-20">
          Viva a cultura, conheça a história, encante-se com{" "}
          <span className="text-amber-500">Queimadas</span>.
        </h2>
        <div className="space-x-6 mt-16">
          <a
            href="#Pontos"
            className="px-8 py-3 border-2 border-white rounded-lg transition-all duration-300 hover:bg-white hover:text-black"
          >
            Pontos Turísticos
          </a>
          <a
            href="#Restaurantes"
            className="px-8 py-3 bg-amber-600 border-2 border-white rounded-lg transition-all duration-300 hover:bg-amber-500 hover:border-amber-300"
          >
            Restaurantes
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
