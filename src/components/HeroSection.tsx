
import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 animate-fade-in">
          Bem-vindo ao Ebo Ayo
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in">
          Sua casa digital para encontrar tudo que precisa para seus rituais sagrados. 
          Produtos autênticos, kits personalizados e a tradição ao seu alcance.
        </p>
        <div className="flex justify-center items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Produtos Autênticos</span>
          </div>
          <div className="w-1 h-4 bg-white/30"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Kits Personalizáveis</span>
          </div>
          <div className="w-1 h-4 bg-white/30"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Entrega Rápida</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
