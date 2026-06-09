import type { ComidaView } from "@/types/Comida";
import { StarIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function PodioMainItem({ comida }: { comida: ComidaView }) {
    const promedio = Math.round(((comida.promedio_estrellas + Number.EPSILON) * 10)) / 10;

    return (
        <Card className="w-full max-w-sm pt-0">
            <img
                src={comida.img_url}
                alt="Event cover"
                className="aspect-video w-full object-cover"
            />
            <CardHeader className="text-center">
                <CardTitle className="tracking-wide font-semibold">{comida.titulo}</CardTitle>
            </CardHeader>

            <CardDescription className="text-center pb-3">
                <div className="flex gap-2 items-center justify-center py-5 rounded-md w-full -mt-2">
                    <div className="flex justify-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="px-1 first:pl-0"
                            >
                                {
                                    promedio < i + 1 && Math.ceil(promedio - 1) >= i ?
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <defs>
                                                    <clipPath id="clip-left">
                                                        <rect x="0" y="0" width="12" height="24" />
                                                    </clipPath>
                                                    <clipPath id="clip-right">
                                                        <rect x="12" y="0" width="12" height="24" />
                                                    </clipPath>
                                                </defs>

                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                                                    fill="currentColor"
                                                    clip-path="url(#clip-left)"
                                                />
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    clip-path="url(#clip-right)"
                                                />
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </>
                                        :
                                        <StarIcon
                                            size={20}
                                            fill={
                                                promedio >= (i + 1)
                                                    ? "#ffba00"
                                                    : "transparent"
                                            }
                                        />
                                }
                            </div>
                        ))}
                    </div>
                    <span className="font-bold text-text text-[.9rem]">
                        {promedio}/5
                    </span>
                </div>
                <div className="text-xs text-muted-foreground">
                    {comida.cantidad_calificaciones} calificaciones
                </div>
            </CardDescription>
            {/*<CardFooter>
                <Button
                    className="w-full font-medium"
                    variant="secondary"
                >
                    <MessageSquareText />
                    Ver comentarios
                </Button>
            </CardFooter>*/}
        </Card>
    );
}
