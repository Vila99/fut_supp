'use client'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchNav(){
    const router = useRouter()
    const [text, setText] = useState("")

    useEffect (
         ()=>{
            //console.log(text)
            router.push('/noticias?equipo='+text)
         },[text,router]
    )

    return(
        <ul className="nav justify-content-end pt-1 pb-1 pe-2 bg-main">
        <li className="nav-item">
            <div className="row bg-main">
                <label forhtml="inputEquipo" className="col col-form-label text-end"></label>
                <div className="col-12">
                    <input 
                    value={text}
                    className="form-control"
                    placeholder='¿Sobre que equipo?' 
                    onChange={e => setText(e.target.value)}
                    id="inputEquipo"
                    />
                </div>
            </div>
        </li>
    </ul>        
    )
}