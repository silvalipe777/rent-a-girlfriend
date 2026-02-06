"use client";
import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function AgeConfirmModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const confirmed = localStorage.getItem("ageConfirmed");
    if (!confirmed) setShow(true);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("ageConfirmed", "true");
    setShow(false);
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <Modal isOpen={show} closable={false}>
      <div className="text-center space-y-6">
        <div className="text-5xl">🔞</div>
        <h2 className="text-2xl font-bold text-white">Verificação de Idade</h2>
        <p className="text-gray-400">
          Este site contém conteúdo destinado exclusivamente a maiores de 18 anos.
        </p>
        <div className="bg-gray-800/50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            Todos os personagens apresentados são fictícios e gerados por inteligência artificial.
            Nenhuma pessoa real é representada.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleReject}>
            Sair
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleConfirm}>
            Tenho 18+ anos
          </Button>
        </div>
      </div>
    </Modal>
  );
}
