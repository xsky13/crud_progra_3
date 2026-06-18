import api from "@/api";

export default async function loadProposals() {
    const comidas = await api.get("/Comida/proposals")
        .then(res => res.data)
        .catch(err => console.log(err));
    console.log(comidas);

    return { proposals: comidas };
}
