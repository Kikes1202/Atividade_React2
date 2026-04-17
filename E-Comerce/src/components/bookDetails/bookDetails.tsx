import useBookData from "../../hooks/usebooksData";
import style from  './style.module.css'
import Header from "../../componentes/header/header";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";




export default function DetalhesLivros(){
    const {id} = useParams();
    const { data: livroInfo = [], isLoading, isError } = useBookData();
    const livro = livroInfo.find(livro => String(livro.id) === String(id))


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
                {!isLoading &&
                    <>
                    
                    {livroInfo && (
                    <div className={style.livroContainer}>
                        <div className={style.cover}>
                            <div className={style.imgWrapper}>
                                <img src={livro?.capa} alt="" />
                            </div>
                        </div>
                        <div className={style.info}>
                            <div className={style.header}>
                                <h1>{livro?.titulo}</h1>
                                <h2>{livro?.autor}</h2>
                            </div>
                            <div className={style.sinopse}>
                                <h3>Sinopse</h3>
                                {livro?.sinopse}
                            </div>

                            <div className={style.addCart}>
                                {`R$ ${livro?.preco}`}
                                <label style={{fontWeight: "600", color: "white"}}>
                                    {"Adicionar ao carrinho"}
                                    <input onClick={() => console.log("clicked")} style={{display: "none"}} type="checkbox" />
                                </label>
                            </div>

                        </div>

                    </div>
                    )}
                    </>}
                {isLoading && <p>Carregando...</p>}
                {isError && <p>Erro!</p>}

            </main>
        </>
    )
}