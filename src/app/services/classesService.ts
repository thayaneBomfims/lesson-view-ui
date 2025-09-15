export type Aula = {
  id: number;
  type: string;
  service: string;
  price: string;
};

export async function fetchAulas(): Promise<Aula[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/classes`, {
    headers: {
      "X-Admin-Token": `${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Erro ao buscar aulas");
  return res.json();
}