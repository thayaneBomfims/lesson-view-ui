"use client";
import { useEffect, useState } from "react";
import { fetchAulas, Aula } from "../services/classesService";
import { fetchHorarios, Horario } from "../services/weekTimeService";

const dias = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
const diasFormatados = [
    "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
];

function gerarHorariosPossiveis() {
    const horarios: string[] = [];
    for (let h = 7; h <= 22; h++) {
        horarios.push(`${h.toString().padStart(2, "0")}:00`);
        horarios.push(`${h.toString().padStart(2, "0")}:30`);
    }
    return horarios;
}
const horariosPossiveis = gerarHorariosPossiveis();

export default function Home() {
    const [aulas, setAulas] = useState<Aula[]>([]);
    const [loadingAulas, setLoadingAulas] = useState(true);

    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [loadingHorarios, setLoadingHorarios] = useState(true);

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        fetchAulas()
            .then(setAulas)
            .catch(() => setAulas([]))
            .finally(() => setLoadingAulas(false));

        fetchHorarios()
            .then(setHorarios)
            .catch(() => setHorarios([]))
            .finally(() => setLoadingHorarios(false));
    }, []);

    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Header */}
            <header className="bg-neutral-900 text-white shadow">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-[var(--accent)]">Dere Dev</h1>

                    {/* Menu desktop */}
                    <nav className="hidden md:flex space-x-4 items-center">
                        <a href="#aulas" className="hover:underline">Aulas</a>
                        <a href="#metodologia" className="hover:underline">Metodologia</a>
                        <a href="#horarios" className="hover:underline">Horários</a>
                        <a href="#canal" className="hover:underline">Canal no Youtube</a>
                        <a href="#canal" className="hover:underline">Contatos</a>
                        <a href="/" className="hover:underline"
                            onClick={() => window.location.href = "/"}
                        >Mais serviços</a>

                        <button
                            className="ml-2 bg-[var(--accent)] text-black px-4 py-2 rounded font-semibold hover:bg-neutral-900 hover:text-white border-2 border-[var(--accent)] transition"
                            onClick={() => window.location.href = "/lessons"}
                        >
                            Login
                        </button>
                    </nav>

                    {/* Menu mobile */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Menu mobile dropdown */}
                {menuOpen && (
                    <div className="md:hidden bg-neutral-900 px-4 pb-4 flex flex-col space-y-2">
                        <a href="#aulas" className="hover:underline" onClick={() => setMenuOpen(false)}>Aulas</a>
                        <a href="#metodologia" className="hover:underline" onClick={() => setMenuOpen(false)}>Metodologia</a>
                        <a href="#horarios" className="hover:underline" onClick={() => setMenuOpen(false)}>Horários</a>
                        <a href="#canal" className="hover:underline" onClick={() => setMenuOpen(false)}>Canal no Youtube</a>
                        <a href="#canal" className="hover:underline" onClick={() => setMenuOpen(false)}>Contatos</a>
                        <button
                            className="mt-2 bg-[var(--accent)] text-black px-4 py-2 rounded font-semibold hover:bg-neutral-900 hover:text-white border-2 border-[var(--accent)] transition"
                            onClick={() => window.location.href = "/lessons"}
                        >
                            Login
                        </button>
                    </div>
                )}
            </header>

            {/* Hero */}
            <section className="text-white text-center py-20 bg-image-code">
                <h2 className="text-4xl font-bold">Quer se tornar um dev?</h2>
                <p className="mt-4 text-lg">Vamos juntos aprender programação ou reforçar seus conhecimentos!</p>
                <button
                    className="cursor-pointer mt-6 bg-neutral-900 text-white px-6 py-3 rounded font-semibold shadow border-2 border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition"
                    onClick={() => window.open("https://wa.me/5516992292986", "_blank")}
                >
                    Quero Começar
                </button>
            </section>

            <main className="flex-grow">
                {/* Aulas */}
                <section id="aulas" className="max-w-6xl mx-auto px-4 py-12">
                    <h3 className="text-2xl font-bold mb-6 text-white">Aulas e Valores</h3>
                    <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        {loadingAulas ? (
                            <div className="text-white">Carregando...</div>
                        ) : aulas.length === 0 ? (
                            <div className="text-white">Nenhuma aula encontrada.</div>
                        ) : (
                            aulas.map((aula) => (
                                <div
                                    key={aula.id}
                                    className="bg-neutral-900 rounded shadow p-6 text-white border-2 border-[var(--accent)]"
                                >
                                    <h4 className="font-semibold text-lg text-[var(--accent)]">{aula.service}</h4>
                                    <p className="mt-2">Tipo: {aula.type.charAt(0).toUpperCase() + aula.type.slice(1)}</p>
                                    <p>Preço por hora: R$ {parseFloat(aula.price).toFixed(2).replace('.', ',')}</p>
                                </div>
                            ))
                        )}
                    </div>
                    <p className="text-sm text-gray-400 mt-5">
                        Não disponibilizamos aulas individuais, somente pacotes com 4 aulas ou mais!
                    </p>
                </section>

                {/* Metodologia */}
                <section id="metodologia" className="bg-neutral-800 py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <h3 className="text-2xl font-bold mb-6 text-white">Minha Metodologia</h3>
                        <p className="text-gray-200">
                            Ensino baseado em prática e projetos reais. A cada aula, você
                            aplica imediatamente o que aprendeu, com acompanhamento próximo e
                            feedback constante.
                        </p>
                        <br />
                        <p>
                            Não temos aulas gravadas e não aplicamos o método "copia e cola", ou seja, você aprende fazendo e ao vivo!
                        </p>
                        <br />
                        <blockquote className="border-l-4 border-[var(--accent)] pl-4 italic mt-4 text-gray-200">
                            Caso você esteja realizando algum desafio para entrar em alguma empresa ou precisando de ajuda com projetos de cursos e pessoais, nós também podemos ajudar! Até mesmo com demandas da sua empresa.
                        </blockquote>
                    </div>
                </section>

                {/* Horários */}
                <section id="horarios" className="max-w-6xl mx-auto px-4 py-12 overflow-x-auto">
                    <h3 className="text-2xl font-bold mb-6 text-white">Horários da Semana</h3>
                    <div className="min-w-max grid grid-cols-7 gap-2 text-center">
                        {/* Cabeçalhos dos dias */}
                        {diasFormatados.map((dia, idx) => (
                            <div key={dias[idx]} className="font-semibold text-[var(--accent)]">{dia}</div>
                        ))}

                        {/* Linhas de horários */}
                        {loadingHorarios ? (
                            <div className="col-span-7 text-white">Carregando...</div>
                        ) : (
                            horariosPossiveis
                                .filter((hora) =>
                                    dias.some((dia) =>
                                        horarios.find((h) => h.weekDay === dia && h.time === hora)
                                    )
                                )
                                .map((hora) =>
                                    dias.map((dia) => {
                                        const horarioEncontrado = horarios.find(
                                            (h) => h.weekDay === dia && h.time === hora
                                        );

                                        if (!horarioEncontrado) {
                                            return (
                                                <div key={dia + hora} className="bg-neutral-800 text-gray-400 p-2 rounded border border-neutral-700">
                                                    Sem aulas disponíveis
                                                </div>
                                            );
                                        }

                                        return (
                                            <div
                                                key={dia + hora}
                                                className={`p-2 rounded border ${horarioEncontrado.available
                                                    ? "bg-green-900 border-green-400 text-green-200"
                                                    : "bg-yellow-900 border-yellow-400 text-yellow-200"
                                                    }`}
                                            >
                                                {hora}
                                                <br />
                                                {horarioEncontrado.available ? "Disponível" : "Ocupado"}
                                            </div>
                                        );
                                    })
                                )
                        )}
                    </div>
                </section>

                {/* Canal e Contato */}
                <section id="canal" className="bg-neutral-900 py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <h3 className="text-2xl font-bold mb-6 text-white">Canal no Youtube & Contato</h3>
                        <div className="w-full aspect-video rounded overflow-hidden border-2 border-[var(--accent)] mb-8">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/IBmK_VZziQQ"
                                title="Dere Dev YouTube"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center mt-6">
                            <a href="https://www.instagram.com/dere.dev" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[var(--accent)] hover:underline" title="Instagram Dere Dev">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                                Instagram
                            </a>
                            <a href="https://wa.me/5516992292986" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[var(--accent)] hover:underline" title="WhatsApp Dere Dev">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.56 4.18 1.62 5.98L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.93 0-3.8-.5-5.44-1.44l-.39-.22-3.67.96.98-3.58-.25-.41A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.36-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.29-1 1-.97 2.43.03 1.43 1.04 2.81 1.19 3 .15.19 2.05 3.14 5.01 4.28.7.24 1.24.38 1.66.49.7.18 1.34.15 1.84.09.56-.07 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-neutral-900 text-white text-center py-4">
                &copy; {new Date().getFullYear()} Dere Dev
            </footer>
        </div>
    );
}
