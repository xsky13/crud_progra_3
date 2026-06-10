import Header from "@/components/Header";
import PodioMainItem from "@/components/Podio/PodioMainItem";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import type { ComidaView } from "@/types/Comida";
import { useSearchParams } from "react-router";
import { useNavigation } from "react-router";
import { useLoaderData } from "react-router";

export default function Podio() {
    const data = useLoaderData() as ComidaView[];
    const navigation = useNavigation();
    const [searchParams, setSearchParams] = useSearchParams();
    const order = searchParams.get("order") ?? "desc";

    const changeOrder = (newOrder: string) => {
        setSearchParams({ order: newOrder });
    };

    return (
        <>
            <Header />
            <div className="py-28 flex gap-10 items-center flex-col px-7">
                <div className="flex items-end w-full sm:w-96 justify-between">
                    <div>
                        <h3 className="subtitle">Podio</h3>
                        <div className="w-6 border border-primary"></div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button type="button" variant="ghost">{navigation.state != "idle" && <Spinner />} Ordenar por {order == "desc" ? "mas popular" : "menos popular"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => changeOrder("desc")} className={`${order == "desc" && "font-bold"} cursor-pointer`}>
                                    Mas popular
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changeOrder("asc")} className={`${order == "asc" && "font-bold"} cursor-pointer`}>
                                    Menos popular
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <PodioMainItem comida={data[0]} />
                <div className="mt-5 flex flex-col justify-center items-center gap-y-3 w-full">
                    {
                        data.map((item, i) => {
                            if (i == 0) return;
                            else
                                return (
                                    <div className="w-full sm:w-lg border-b border-muted/90 pl-0 pr-4 py-2 relative">
                                        {
                                            i == 1 ?
                                                <img src="/second.png" className="absolute top-[40%] right-0" alt="segundo lugar" width={40} />
                                                :
                                                <img src="/third.png" className="absolute top-[40%] right-0" alt="tercer lugar" width={40} />

                                        }
                                        <span className="font-semibold">{item.titulo}</span>
                                        <div className="mt-3">
                                            <div className="flex gap-1 items-center font-bold text-black dark:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                                </svg>
                                                {Math.round(((item.promedio_estrellas + Number.EPSILON) * 10)) / 10}/5
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {item.cantidad_calificaciones} calificaciones
                                            </div>
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
        </>
    );
}
