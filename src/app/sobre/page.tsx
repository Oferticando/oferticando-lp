import type { Metadata } from "next";
import { SobreClient } from "./components/SobreClient";

export const metadata: Metadata = {
  title: "Sobre — Oferticando",
  description:
    "Saiba como o Oferticando evoluiu de um projeto pessoal de curadoria para um SaaS premium de alta conversão, desenvolvido de criador para criadores de conteúdo e afiliados.",
};

export default function SobrePage() {
  return <SobreClient />;
}

