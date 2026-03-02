import { useEffect, useState } from "react";
import axios from "axios"
import Header from "../../componentes/header/header";
import style from "./style.module.css"
import  banner from "../../assets/Banner Area.png"
import { Link } from "react-router-dom";

interface Generos{
    id: number,
    genero: string
}

interface Livros{
    id: number,
    titulo: string,
    autor: string,
    genero: string,
    preco: string
    sinopse: string,
    capa: string,

}




export default function Home(){
    const[cardInfo, setCardInfo] = useState<Generos[]>([])
    const[livroInfo, setLivroInfo] = useState<Livros[]>([])
    
    useEffect(() => {
        axios.get("http://localhost:3000/livros")
        .then(response => (setLivroInfo(response.data)))
        .catch(error => (console.error(`Erro: ${error}`)))

        axios.get("http://localhost:3000/generos")
        .then(response => (setCardInfo(response.data)))
        .catch(error => (console.error(`Erro: ${error}`)))
    }, [])


    function quatroLivros(genero: string){
        let i: number;
        let listaLivros = [];
        for(i = 0; i < livroInfo.length && listaLivros.length < 4; i++){
            if(livroInfo[i].genero === genero){
                listaLivros.push(livroInfo[i]);
            }
        }

        return listaLivros;
    }

    
    return(
        <div className={style.wrapper}>
        <Header/>

        <main className={style.main}>
            <div className={style.descontosContainer}>
                <img src={banner} alt="banner" />
            </div>

            {cardInfo.map((item) => (
                <div className={style.generosContainer} key={item.id}>
                    <div className={style.header}>
                        <h1 style={{color: "#090937"}}>{item.genero}</h1>
                        <Link to= {`/generos/${item.id}`} className={style.verMais}>{"Ver Mais"}</Link>
                    </div>

                    <div className={style.livrosWrapper}>
                        {quatroLivros(item.genero).map((info) => (
                            <Link to={`/bookDetails/${info.id}`} className={style.livrosContainer} key={info.titulo}>
                                <div className={style.imgContainer}>
                                    <img src={info.capa} alt="capa" />
                                </div>
                                <div className={style.info}>
                                    <div className={style.infoHeader}>
                                        <h4>{info.titulo}</h4>
                                        <p>{info.autor}</p>
                                    </div>
                                    <div className={style.infoPrice}>
                                        <h3 className={style.price}>{"R$ " + info.preco}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>


                </div>
                
            ))}


        </main>
    </div>

    )
}