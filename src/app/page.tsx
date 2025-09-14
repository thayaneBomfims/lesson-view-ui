"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

import Lottie from "lottie-react";
import animationData from "../../public/animations/background.json";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-neutral-900/80 backdrop-blur-md z-50 shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--accent)]">Dere Desenvolvimento</h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#sobre" className="hover:text-[var(--accent)] transition">Sobre</a>
            <a href="#servicos" className="hover:text-[var(--accent)] transition">Serviços</a>
            <a href="#portfolio" className="hover:text-[var(--accent)] transition">Portfólio</a>
            <a href="#contato" className="hover:text-[var(--accent)] transition">Contato</a>
            <button
              className="ml-2 bg-[var(--accent)] text-black px-4 py-2 rounded font-semibold hover:bg-neutral-800 hover:text-white border-2 border-[var(--accent)] transition"
              onClick={() => window.location.href = "/servico_aulas"}
            >
              Aulas
            </button>
          </nav>

          {/* Mobile nav */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Dropdown mobile */}
        {menuOpen && (
          <div className="md:hidden bg-neutral-900 px-4 pb-4 flex flex-col space-y-2">
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfólio</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
            <button
              className="mt-2 bg-[var(--accent)] text-black px-4 py-2 rounded font-semibold hover:bg-neutral-800 hover:text-white border-2 border-[var(--accent)] transition"
              onClick={() => window.location.href = "/aulas"}
            >
              Aulas
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
        {/* Animação atrás do texto */}
        <div className="absolute inset-0 z-0 format-gif-responsive">
          <Lottie animationData={animationData} loop autoplay className="w-100" />
          {/* Overlay escura para melhor contraste */}
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        {/* Texto em cima da animação */}
        <motion.div
          className="relative z-10 max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-5xl font-bold mb-4">
            Criando <span className="text-[var(--accent)]">soluções</span> digitais
          </h2>
          <p className="text-lg text-gray-200 mb-6">
            Desenvolvimento de software, automações inteligentes e ensino de programação.
          </p>
          <a
            href="#portfolio"
            className="bg-[var(--accent)] px-6 py-3 rounded font-semibold text-black hover:bg-neutral-900 hover:text-white transition"
          >
            Ver portfólio
          </a>
        </motion.div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.h3
          className="text-3xl font-bold mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
        >
          Quem somos nós
        </motion.h3>
        <motion.p
          className="text-gray-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          variants={fadeInUp}
        >
          Somos desenvolvedores e engenheiros apaixonados por criar soluções práticas. Já ajudamos empresas com softwares sob medida, sites,
          automações de processos, auditoria para organizar sua empresa e ensino de tecnologia. Minha missão é unir <span className="text-[var(--accent)]">eficiência</span> e
          <span className="text-[var(--accent)]"> simplicidade</span> em cada projeto, deixando tudo sempre bem claro para o cliente.
        </motion.p>
      </section>

      {/* Serviços */}
      <section id="servicos" className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">O que fazemos</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Softwares", desc: "Sistemas web e ERPs sob medida." },
            { title: "Sites", desc: "Landing Pages e sites para sua empresa e pessoais." },
            { title: "RPA & Scripts", desc: "Automatizações com Python e integrações." },
            { title: "Consultoria", desc: "Mentorias e apoio em projetos, arquiteturas e organizações." },
            { title: "Inteligência de dados", desc: "Análise de dados e dashboards, tal como machine learning e IAs." },
            { title: "Aulas", desc: "Ensino de programação do básico ao avançado, individual ou em grupo." }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-neutral-900 p-6 rounded-xl shadow border border-neutral-700 hover:border-[var(--accent)] transition"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              variants={fadeInUp}
            >
              <h4 className="text-xl font-semibold text-[var(--accent)]">{item.title}</h4>
              <p className="text-gray-300 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfólio */}
      {/* Portfólio */}
      <section id="portfolio" className="bg-neutral-900 py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Portfólio</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "ERP Personalizado",
              desc: "Sistema online de gestão para pequenas e medias empresas, com gestão de contratos, financeiro e relatórios.",
              tech: ["React", "FastAPI (Python)", "MongoDB"],
              image: "/assets/imgs/integrium.png",
            },
            {
              title: "Organização e planejamento de projetos",
              desc: "Documentação e engenharia de projetos de software, com planejamento ágil e definição de requisitos.",
              tech: ["Whimsical", "UML", "Figma"],
              image: "/assets/imgs/sitecursos.png",
            },
            {
              title: "Módulo simples de Gestão de Clientes",
              desc: "Sistema desktop para criação e manutenção de clientes e serviço prestado.",
              tech: ["Electron", "React"],
              image: "/assets/imgs/registrosoptica.png",
            },
            {
              title: "Plataforma Gratuita de Artigos Religiosos",
              desc: "Site para leitura e compartilhamento de artigos sobre espiritualidade e religião.",
              tech: ["React", "NestJS", "PostgresSQL"],
              image: "/assets/imgs/emporium.png",
              link: "https://emporium-ui.vercel.app/topicos",
            },
            {
              title: "Conversão de dados e plataforma para visualização formatada",
              desc: "Sistema para converter e tratar dados massivos e mostrá-los online de forma amigável.",
              tech: ["React", "NestJS", "PostgresSQL"],
              image: "/assets/imgs/godeliver.png",
            },
            {
              title: "Criação de modelos e gestão de Sites",
              desc: "Site para divulgação e venda de doces.",
              tech: ["Angular", ".NET", "MySQL", "Figma"],
              embed: true,
            },
            {
              title: "RPA de Notas Fiscais",
              desc: "Automação com Python e Selenium para baixar, validar e organizar XMLs de notas fiscais.",
              tech: ["Python", "Selenium", "FastAPI"],
              image: "/assets/imgs/selenium.png",
            },
            {
              title: "Automatização de Envio em Massa de Mensagens via WhatsApp",
              desc: "Sistema desktop para envio de mensagens personalizadas para grande quantia de contatos no Whatsapp.",
              tech: ["ElectronJS", "EJS"],
              image: "/assets/imgs/wttpsender.png",
            },

          ].map((project, i) => (
            <motion.div
              key={i}
              className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 flex flex-col hover:border-[var(--accent)] transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              {/* Imagem ou vídeo */}
              {project.image && (
                <>
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      quality={100}
                      className="cursor-pointer rounded shadow object-cover"
                      onClick={() => setOpen(project.image)}
                    />
                  </div>

                  {/* Modal */}
                  {open === project.image && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                      onClick={() => setOpen(null)}
                    >
                      <div className="relative w-11/12 h-[90vh]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          unoptimized
                          className="rounded shadow-lg object-contain"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {project.embed && (
                <iframe
                  style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                  width={300}
                  height={200}
                  src="https://embed.figma.com/proto/S9egnfAXZf4ZOoe4uv1MRQ/Loja-de-Doces?node-id=3-2&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
                  allowFullScreen
                />
              )}

              {/* Título e descrição */}
              <h4 className="text-xl font-semibold text-[var(--accent)] mb-2">
                {project.title}
              </h4>
              <p className="text-gray-300 mb-4">{project.desc}</p>

              {/* Tecnologias */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, j) => (
                  <span
                    key={j}
                    className="bg-neutral-900 border border-[var(--accent)] text-[var(--accent)] text-xs px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-center bg-[var(--accent)] text-black px-4 py-2 rounded font-semibold hover:bg-neutral-900 white-hover border border-[var(--accent)] transition"
                >
                  Ver Projeto
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>




      {/* Contato */}
      <section id="contato" className="py-20 text-center px-6">
        <h3 className="text-3xl font-bold mb-6">Vamos conversar</h3>
        <p className="text-gray-300 mb-6">Entre em contato para projetos, consultoria ou aulas.</p>
        <div className="flex justify-center gap-6">
          <a href="https://wa.me/5516992292986" target="_blank" rel="noopener noreferrer"
            className="bg-[var(--accent)] px-6 py-3 rounded font-semibold text-black hover:bg-neutral-800 white-hover border border-[var(--accent)] transition">
            WhatsApp
          </a>
          <a href="https://www.instagram.com/dere.dev" target="_blank" rel="noopener noreferrer"
            className="bg-neutral-800 px-6 py-3 rounded font-semibold text-white border border-[var(--accent)] hover:bg-[var(--accent)] black-hover transition">
            Instagram
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-center text-gray-400 py-4 text-sm">
        &copy; {new Date().getFullYear()} Thayane Desenvolvimento. Todos os direitos reservados.
      </footer>
    </div>
  );
}
