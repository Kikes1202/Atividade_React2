import useBookData from "../../hooks/usebooksData";
import Header from "../../componentes/header/header";
import style from "./style.module.css"
import  banner from "../../assets/Banner Area.png"
import { Link } from "react-router-dom";




export default function Home(){
    const {data: livroInfo = [], isLoading, isError} = useBookData();
    const cardInfo = [...new Set(livroInfo.map(livro => livro.genero))]
    

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

            {cardInfo.map((genero) => (
                <div className={style.generosContainer} key={genero}>
                    {!isLoading && 
                        <>
                            <div className={style.header}>
                                <h1 style={{color: "#090937"}}>{genero}</h1>
                                <Link to= {`/generos/${genero}`} className={style.verMais}>{"Ver Mais"}</Link>
                            </div>
                        </>
                    }

                    <div className={style.livrosWrapper}>
                    {!isLoading &&
                        <>
                            {quatroLivros(genero).map((info) => (
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
                        </>
                    }

                    </div>


                </div>
                
            ))}
            {isLoading && <p>Carregando...</p>}
            {isError && <p>Erro!</p>}


        </main>
    </div>

    )
}