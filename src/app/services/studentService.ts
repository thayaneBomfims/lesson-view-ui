export async function fetchStudent(email: string): Promise<any> {
    const res = await fetch(`http://localhost:3000/api/v1/students?email=${email}`, {
        headers: {
            "X-Admin-Token": "meu-super-token-123",
        },
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Erro ao buscar estudante");
    const data = await res.json();

    return data[0];
}

export async function fetchStudentById(user_id: string): Promise<any> {
    const res = await fetch(`http://localhost:3000/api/v1/students/${user_id}`, {
        headers: {
            "X-Admin-Token": "meu-super-token-123",
        },
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Erro ao buscar estudante");
    const data = await res.json();

    return data;
}

export async function updateStudentGoogleCode(user_id: string, googleCode: string) {
    const res = await fetch(`http://localhost:3000/api/v1/students/${user_id}`, {
        method: "PATCH",
        headers: {
            "X-Admin-Token": "meu-super-token-123",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleCode }),
    });

    if (!res.ok) {
        throw new Error("Erro ao atualizar googleCode do aluno");
    }

    return await res.json();
}
