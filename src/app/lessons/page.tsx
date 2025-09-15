"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { fetchStudent, fetchStudentById, updateStudentGoogleCode } from "../services/studentService";
import { User, Phone, Mail, BookOpen, Calendar, UserCircle } from "lucide-react";

// Tipos adaptados ao novo retorno
type Responsible = {
    id: number;
    nome: string;
    contato: string;
    email: string;
};

type WeekTime = {
    id: number;
    weekDay: string;
    time: string;
    available: boolean;
};

type StudentClassWeekTime = {
    id: number;
    totalLessons: number;
    completedLessons: number;
    created_at: string;
    weekTime: WeekTime;
};

type StudentClassHistorical = {
    id: number;
    subject: string;
    links: string[];
    performance: string;
    homework: string;
    created_at: string;
    updated_at: string;
};

type Class = {
    id: number;
    type: string;
    service: string;
    price: string;
};

type StudentClass = {
    id: number;
    studentStatus: string;
    created_at: string;
    class: Class;
    studentClassWeekTimes: StudentClassWeekTime[];
    studentClassHistoricals: StudentClassHistorical[];
};

type Aluno = {
    id: number;
    name: string;
    age: number;
    contactNumber: string;
    email: string;
    googleCode: string | null;
    responsibles: Responsible[];
    studentClasses: StudentClass[];
};

export default function MinhaAula() {
    const { data: session, status } = useSession();
    const [aluno, setAluno] = useState<Aluno | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const syncAluno = async () => {
            if (status === "authenticated" && session?.user?.email && session?.user?.googleId) {
                try {
                    setLoading(true);
                    let student = await fetchStudent(session.user.email);

                    if (!student.googleCode && session.user.googleId) {
                        student = await updateStudentGoogleCode(student.id, session.user.googleId);
                    }
                    const studentUpdated = await fetchStudentById(student.id);

                    setAluno(studentUpdated);
                } catch (err) {
                    setAluno(null);
                } finally {
                    setLoading(false);
                }
            }
        };
        syncAluno();
    }, [session, status]);

    if (status === "loading" || loading) {
        return <div className="text-white text-center py-20 animate-pulse">Carregando seus dados...</div>;
    }

    if (status !== "authenticated") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black">
                <h2 className="text-3xl font-bold text-white mb-6">Acesse sua área de aluno</h2>
                <button
                    className="bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
                    onClick={() => signIn("google")}
                >
                    Entrar com Google
                </button>
            </div>
        );
    }

    if (!aluno) {
        return (
            <div className="text-white text-center py-20">
                Não encontramos seu cadastro. Entre em contato com o suporte.
            </div>
        );
    }

    // Pega a primeira turma vinculada (pode adaptar para múltiplas)
    const turma = Array.isArray(aluno.studentClasses) && aluno.studentClasses.length > 0 ? aluno.studentClasses[0] : undefined;
    const aula = turma?.class;
    const historico = Array.isArray(turma?.studentClassHistoricals) ? turma.studentClassHistoricals : [];
    const semana = Array.isArray(turma?.studentClassWeekTimes) && turma.studentClassWeekTimes.length > 0 ? turma.studentClassWeekTimes[0].weekTime : undefined;
    const responsavel = Array.isArray(aluno.responsibles) && aluno.responsibles.length > 0 ? aluno.responsibles[0] : undefined;
    const weekTimeInfo = turma?.studentClassWeekTimes?.[0];

    // Progresso das aulas
    const totalLessons = weekTimeInfo?.totalLessons ?? 0;
    const completedLessons = weekTimeInfo?.completedLessons ?? 0;
    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return (
        <div className="min-h-screen from-black via-neutral-900 to-black text-white flex flex-col items-center py-12 px-4">
            <h1 className="text-4xl font-extrabold mb-10 text-[var(--accent)] drop-shadow-lg">
                🎓 Bem-vindo, {aluno.name}!
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                {/* Dados do Aluno */}
                <div className="glass-card border-l-4 border-[var(--accent)]">
                    <div className="flex items-center gap-3 mb-4">
                        <UserCircle size={40} className="text-[var(--accent)]" />
                        <h2 className="text-2xl font-semibold">Dados do Aluno</h2>
                    </div>
                    <div className="space-y-2 text-gray-200">
                        <p><User className="inline mr-2 text-[var(--accent)]" /> <strong>Idade:</strong> {aluno.age}</p>
                        <p><Mail className="inline mr-2 text-[var(--accent)]" /> <strong>Email:</strong> {aluno.email}</p>
                        <p><Phone className="inline mr-2 text-[var(--accent)]" /> <strong>Contato:</strong> {aluno.contactNumber}</p>
                    </div>
                    {aluno.age < 18 && responsavel && (
                        <div className="mt-6 bg-neutral-800/70 p-4 rounded-xl border border-neutral-700">
                            <h3 className="text-lg font-semibold mb-2 text-[var(--accent)]">👨‍👩‍👦 Responsável</h3>
                            <p><strong>Nome:</strong> {responsavel.nome}</p>
                            <p><strong>Contato:</strong> {responsavel.contato}</p>
                            <p><strong>Email:</strong> {responsavel.email}</p>
                        </div>
                    )}
                </div>

                {/* Aula Vinculada */}
                <div className="glass-card border-l-4 border-[var(--accent)]">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen size={40} className="text-[var(--accent)]" />
                        <h2 className="text-2xl font-semibold">Aula Vinculada</h2>
                    </div>
                    {aula ? (
                        <>
                            <p><strong>Serviço:</strong> {aula.service}</p>
                            <p><strong>Tipo:</strong> {aula.type}</p>
                            <p><strong>Preço:</strong> R$ {parseFloat(aula.price).toFixed(2).replace('.', ',')}</p>
                            {semana && (
                                <p><strong>Dia da semana:</strong> {semana.weekDay} às {semana.time.slice(0, 5)}</p>
                            )}
                            {/* Progresso das aulas */}
                            <div className="mt-6">
                                <span className="font-semibold text-[var(--accent)]">Progresso do Pacote</span>
                                <div className="w-full bg-neutral-800 rounded-full h-5 mt-2 relative overflow-hidden">
                                    <div
                                        className="bg-[var(--accent)] h-5 rounded-full transition-all"
                                        style={{ width: `${progressPercent}%` }}
                                    ></div>
                                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                                        {completedLessons} / {totalLessons} aulas ({progressPercent}%)
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-gray-400">
                            Nenhuma aula vinculada ao seu cadastro.
                        </div>
                    )}
                </div>
            </div>

            {/* Histórico de Aulas */}
            <div className="glass-card border-l-4 border-[var(--accent)] mt-10 w-full max-w-5xl">
                <div className="flex items-center gap-3 mb-4">
                    <Calendar size={40} className="text-[var(--accent)]" />
                    <h2 className="text-2xl font-semibold">Histórico de Aulas</h2>
                </div>
                {historico.length > 0 ? (
                    <ul className="grid md:grid-cols-2 gap-6">
                        {historico.map((h) => (
                            <li key={h.id} className="bg-neutral-800/80 p-4 rounded-xl border border-neutral-700 flex flex-col shadow-md hover:scale-[1.02] transition">
                                <span className="font-semibold text-[var(--accent)]">{new Date(h.created_at).toLocaleDateString()}</span>
                                <span className="font-bold text-lg">{h.subject}</span>
                                <span className="text-gray-400 text-sm">Tarefa: {h.homework}</span>
                                {h.links.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {h.links.map((link, idx) => (
                                            <a key={idx} href={link} target="_blank" rel="noopener noreferrer" className="underline text-[var(--accent)] text-xs">{link}</a>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-gray-400">
                        Nenhum histórico de aulas disponível.
                    </div>
                )}
            </div>

            <style jsx>{`
                .glass-card {
                    background: rgba(30, 30, 30, 0.7);
                    border-radius: 1.5rem;
                    backdrop-filter: blur(8px);
                    padding: 2rem;
                    transition: transform 0.2s;
                }
                .glass-card:hover {
                    transform: scale(1.01);
                }
            `}</style>
        </div>
    );
}
