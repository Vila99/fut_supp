import Link from "next/link";
import HouseFillClient from "@/app/components/HouseFillClient";

//Get data from json-server
async function getNoticias(id) {
    const res = await fetch(`${process.env.DB_HOST}noticias?id=${id}`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function NoticeDetail({ params }) {
    //Capturamos el producto
    const data = await getNoticias(params.id)
    const noticias =data[0]

    return (
        <div className="contPrincipal vh-100 pt-3 bg-main px-5">
            <nav ariaLabel="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item nav-link"><Link href="/"><HouseFillClient/></Link></li>
                <li className="breadcrumb-item"><Link href="/noticias">Noticias</Link></li>
                <li className="breadcrumb-item active nav-link" ariaCurrent="page">{noticias.equipo}</li>
                </ol>
            </nav>
            <div className="grid">
                <div className="row g-0">
                <div className="col-6">
                    <img src={"/img/" + noticias.img} className="img-fluid" alt="" />
                </div>
                <div className="col-6 bg-blanco px-4 py-4">
                    <p className="fs-6 text-body-secondary">{noticias.equipo}</p>
                    <p className="fs-2 fw-bold" style={{ textAlign: "" }}>
                    {noticias.titulo}
                    </p>
                    <p
                    className="fs-5 fw-medium mt-5"
                    >
                    {" "}
                    {noticias.descripcion}
                    </p>
                </div>
                </div>
            </div>
        </div>

        )
    }