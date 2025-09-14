export type Horario = {
    weekDay: string;
    time: string;
    available: boolean;
};

export async function fetchHorarios(): Promise<Horario[]> {
    const res = await fetch("http://localhost:3000/api/v1/week-time", {
        headers: {
            "X-Admin-Token": "meu-super-token-123",
        },
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Erro ao buscar horários");
    const data = await res.json();
    // Ajusta o formato do horário para "HH:MM"
    return data.map((h: any) => ({
        weekDay: h.weekDay,
        time: h.time.slice(0, 5), // "08:00:00" -> "08:00"
        available: h.available,
    }));
}