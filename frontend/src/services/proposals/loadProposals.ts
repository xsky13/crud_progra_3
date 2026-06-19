import api from "@/api";

export default async function loadProposals() {
    const comidas = await api.get("/Propuesta")
        .then(res => res.data)
        .catch(err => console.log(err));
    console.log(comidas);

    return { proposals: comidas };
}
