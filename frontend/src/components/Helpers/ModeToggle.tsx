import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    console.log(theme);
    return (
        <div className="rounded-full border border-accent p-1 flex gap-1">
            <div className={`p-1.5 cursor-pointer rounded-full ${theme == "light" && "bg-accent"}`} onClick={() => setTheme("light")}>
                <SunIcon size={15} />
            </div>
            <div className={`p-1.5 cursor-pointer rounded-full ${theme == "dark" && "bg-accent"}`} onClick={() => setTheme("dark")}>
                <MoonIcon size={15} />
            </div>
        </div>
    )
}
