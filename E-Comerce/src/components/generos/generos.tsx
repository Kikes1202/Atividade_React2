import useBookData from "../../hooks/usebooksData";
import {useState} from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../componentes/header/header";
import style from "./style.module.css"
import lupa from "../../assets/Search.svg"
import type { BookData } from "../../types/book-data";




export default function ListaGeneros(){
    const[resultado, setResultado] = useState<BookData[]>([])
    const[palavra, _setPalavra] = useState('')
    const { genero = ""} = useParams();
    const { data: livroInfo = [], isLoading, isError } = useBookData();





    function filtrarGenero(genero: string){
        const listaLivros = []
        let i: number;
        for(i = 0; i < livroInfo.length; i++){
            if(livroInfo[i].genero === genero){
                listaLivros.push(livroInfo[i])
            }
        }

        return listaLivros
    }



    function ajustarFonte(titulo: string){
        if(titulo.length > 30){
            return style.fontePequena
        } else if(titulo.length > 20) return style.fonteMedia;
        else return style.fonteNormal
    }


    function searchBar(p: string){
        const encontrados = []
        const livrosGenero = filtrarGenero(genero)
        for(let i = 0; i < livrosGenero.length; i++){
            if(livrosGenero[i].titulo.toLowerCase().includes(p.toLowerCase()))
                encontrados.push(livrosGenero[i])
        }

        setResultado(encontrados)

    }


    

    return(
        <>
            <Header/>
            <main className={style.main}>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    searchBar(palavra)
                }}
                     className={style.searchContainer}>

                    <button type="submit" >
                        <img src={lupa} alt="lupa" />
                    </button>
                    <input 
                        onChange={(e) => searchBar(e.target.value)}
                        id= "searchBar"
                        className={style.searchBar}
                        style={{paddingLeft: "3rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem", fontWeight: 400, color: "black", fontSize: "20px"}}
                        placeholder="Pesquisar por título"
                    />
                </form>

                    <div className={style.generoContainer}>
                        <div className={style.header}>
                            <Link style={{textDecoration: "none"}} to="/home"><h1>{"<"}</h1></Link>
                            <h2>{genero}</h2>
                        </div>
                        <div className={style.booksContainer}>
                            {!isLoading &&
                                <>
                                {(resultado.length > 0 ? resultado : filtrarGenero(genero)).map((info) => (
                                <Link to={`/bookDetails/${info.id}`} className={style.book} key={info.titulo}>
                                    <div className={style.bookImage}>
                                        <img src={info.capa} alt="Capa" />
                                    </div>
                                    <div className={style.bookInfo}>
                                        <div className={style.bookInfoHeader}>
                                            <h3 className={ajustarFonte(info.titulo)}>{info.titulo}</h3>
                                            <h4 className={style.autor}>{info.autor}</h4>
                                        </div>
                                        <h2 className={style.bookInfoPrice}>{info.preco}</h2>
                                    </div>
                                </Link>
                            ))}
                                </>
                            }
                            {isLoading && <p>Carregando...</p>}
                            {isError && <p>Erro!</p>}
                        </div>
                    </div>



            </main>
        </>
    )
}