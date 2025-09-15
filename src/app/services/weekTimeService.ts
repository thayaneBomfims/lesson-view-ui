export type Horario = {
    weekDay: string;
    time: string;
    available: boolean;
};

export async function fetchHorarios(): Promise<Horario[]> {
    const res = await fetch(`${process.env.GOOGLE_CLIENT_ID}/api/v1/week-time`, {
        headers: {
            "X-Admin-Token": `${process.env.ADMIN_TOKEN}`,
        },
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Erro ao buscar horários");
    const data = await res.json();
    // Ajusta o formato do horário para "HH:MM"
    return data.map((h: Horario) => ({
        weekDay: h.weekDay,
        time: h.time.slice(0, 5), // "08:00:00" -> "08:00"
        available: h.available,
    }));
}