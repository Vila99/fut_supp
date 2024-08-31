import Link from "next/link";

export default function NoticeCard({img,equipo,titulo,id}){
    return(
        <div className="card mb-4" style={{ width: "20rem" }}>
            <img
                src={"./img/" + img}
                className="card-img-top p-3"
                alt={equipo}
                style={{ objectFit: 'cover', height: '200px' }} // Ajusta la altura de la imagen según sea necesario
            />
            <div className="card-body">
                <h5 className="card-title">{equipo}</h5>
                <p className="card-text">
                    {titulo}  {/* Elimina el truncamiento para mostrar más contenido */}
                </p>
                <Link href={"./noticias/" + id} className="btn btn-primary w-100">Más Info</Link>
            </div>
        </div>
    )
}    