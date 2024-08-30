'use client'
import { ThemeProvider } from "next-themes"

export default function ThemeProviderClient({children}){
    return(
        <ThemeProvider>{children}</ThemeProvider>
    )
}