import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className="text-center contPrincipal pt-5 vh-100">
        <img src="./404.svg" height={200} className="colorFilter404"/>
        <h2 className="color404 font-weight-bold">¡Ups! Parece que hubo un problema</h2>
        <p class="mt-5">No podemos encontrar la ruta que nos pides</p>
        <p>Vuelve al  <Link href="/">Home</Link> y utiliza la barra de navegación</p>
    </main>
  )
}