export async function fetchStudent(email: string) {
    const res = await fetch(`${process.env.GOOGLE_CLIENT_ID}/api/v1/students?email=${email}`, {
        headers: {
            "X-Admin-Token": `${process.env.ADMIN_TOKEN}`,
        },
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Erro ao buscar estudante");
    const data = await res.json();

    return data[0];
}

export async function fetchStudentById(user_id: string) {
    const res = await fetch(`${process.env.GOOGLE_CLIENT_ID}/api/v1/students/${user_id}`, {
        headers: {
            "X-Admin-Token": `${process.env.ADMIN_TOKEN}`,
        },
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Erro ao buscar estudante");
    const data = await res.json();

    return data;
}

export async function updateStudentGoogleCode(user_id: string, googleCode: string) {
    const res = await fetch(`${process.env.GOOGLE_CLIENT_ID}/api/v1/students/${user_id}`, {
        method: "PATCH",
        headers: {
            "X-Admin-Token": `${process.env.ADMIN_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleCode }),
    });

    if (!res.ok) {
        throw new Error("Erro ao atualizar googleCode do aluno");
    }

    return await res.json();
}
