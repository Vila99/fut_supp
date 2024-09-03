import NoticeCard from "../components/NoticeCard";
import SearchNav from "../components/SearchNav";

// Get data from json-server, Noticias
async function getNotice(equipo) {
    let res;

    // Comprobamos que equipo no esté vacío
    if (equipo) {
        res = await fetch(`${process.env.DB_HOST}noticias?equipo=${equipo}&_limit=8`);
    } else {
        res = await fetch(`${process.env.DB_HOST}noticias?_limit=10`);
    }

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Notice({ searchParams }) {
    const notice = await getNotice(searchParams.equipo);

    return (
        <>
            {/* CONTENIDO */}
            <div className="pb-3 pt-4 bg-main px-5">
                <h1 className="ps-2 text-center">Noticias</h1>
                <SearchNav />
                <div className="grid">
                    <div className="row mt-3">
                        <div className="col-12 justify-content-center">
                            {/* DESTACADOS TARJETAS */}
                            <div className="d-flex p-2 flex-wrap justify-content-between">
                                {
                                    notice.map(noticia => (
                                        <NoticeCard 
                                            key={noticia.id} 
                                            img={`/img/${noticia.img}`} 
                                            equipo={noticia.equipo}
                                            titulo={noticia.titulo}  
                                            id={noticia.id}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* CONTENIDO */}
        </>
    );
}