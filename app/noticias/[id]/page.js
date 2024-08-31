import Link from "next/link";
import HouseFillClient from "@/app/components/HouseFillClient";

//Get data from json-server, Top Products
async function getNoticias(id) {
    const res = await fetch('http://localhost:4000/noticias?id='+id, { cache: 'no-store' })
   
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
                <li className="breadcrumb-item"><Link href="/"><HouseFillClient/></Link></li>
                <li className="breadcrumb-item"><Link href="/noticias">Noticias</Link></li>
                <li className="breadcrumb-item active" ariaCurrent="page">{noticias.equipo}</li>
                </ol>
            </nav>
            <div className="grid">
                <div className="row">
                <div className="col-6">
                    <img src={"/img/" + noticias.img} className="img-fluid" alt="" />
                </div>
                <div className="col-6 bg-blanco px-4 py-4 mt-4">
                    <p className="fs-6 text-body-secondary">Referencia: {noticias.equipo}</p>
                    <p className="fs-2 fw-medium" style={{ textAlign: "justify" }}>
                    {noticias.titulo}
                    </p>
                    <p
                    className="fs-5 fw-bold mt-5"
                    >
                    {" "}
                    En Stock, {noticias.equipo}
                    </p>
                    <p className="fs-2 fw-bold mt-5" style={{ color: "#BE004F" }}>
                    {" "}
                    {noticias.equipo} € <span>IVA incluido</span>
                    </p>
                </div>
                </div>
            </div>
        </div>

        )
    }