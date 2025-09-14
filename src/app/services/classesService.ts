export type Aula = {
  id: number;
  type: string;
  service: string;
  price: string;
};

export async function fetchAulas(): Promise<Aula[]> {
  // TODO Colocar URL em variável de ambiente
  const res = await fetch("http://localhost:3000/api/v1/classes", {
    // TODO Colocar token em variável de ambiente
    headers: {
      "X-Admin-Token": "meu-super-token-123",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Erro ao buscar aulas");
  return res.json();
}