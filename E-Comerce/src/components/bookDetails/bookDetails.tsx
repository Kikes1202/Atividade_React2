import { useState, useEffect } from "react";
import style from  './style.module.css'
import Header from "../../componentes/header/header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

interface Livros{
    id: number,
    titulo: string,
    autor: string,
    genero: string,
    preco: string
    sinopse: string,
    capa: string,
}


export default function DetalhesLivros(){
    const{id} = useParams();
    const[infoLivro, setinfoLivro] = useState<Livros>({

        id: 0,
        titulo: '',
        autor: '',
        genero: '',
        preco: '',
        sinopse: '',
        capa: '',

    })

    useEffect(() => {
        axios.get(`http://localhost:3000/livros/${id}`)
        .then(response => (setinfoLivro(response.data)))
        .catch(error => (console.error(`Erro: ${error}`)))
    }, [id])

    return(
        <>
            <Header/>

            <main className={style.main}>

                <div className={style.detalhesContainer}>
                    <Link style={{display: "flex", flexDirection: "row", textDecoration: "none", gap: "0.5rem"}} to="/home">
                        <h2 style={{marginTop: "1.5rem"}}>{"<"}</h2>
                        <h2 style={{marginTop: "1.5rem"}}>Detalhes do Livro</h2>
                    </Link>
                </div>

                    {infoLivro && (
                    <div className={style.livroContainer}>
                        <div className={style.cover}>
                            <div className={style.imgWrapper}>
                                <img src={infoLivro.capa} alt="" />
                            </div>
                        </div>
                        <div className={style.info}>
                            <div className={style.header}>
                                <h1>{infoLivro.titulo}</h1>
                                <h2>{infoLivro.autor}</h2>
                            </div>
                            <div className={style.sinopse}>
                                <h3>Sinopse</h3>
                                {infoLivro.sinopse}
                            </div>

                            <div className={style.addCart}>
                                {`R$ ${infoLivro.preco}`}
                                <label style={{fontWeight: "600", color: "white"}}>
                                    {"Adicionar ao carrinho"}
                                    <input onClick={() => console.log("clicked")} style={{display: "none"}} type="checkbox" />
                                </label>
                            </div>

                        </div>

                    </div>
                    )}
            

            </main>
        </>
    )
}