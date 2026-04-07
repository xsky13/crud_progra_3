import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gestion Comidas" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <h1 className="text-center text-4xl font-bold">Fuap</h1>;
}
