import {Link} from "react-router-dom"
import style from './style.module.css'
import logo from "../../assets/Logo (Stroke).svg"
import user from "../../assets/Profile.svg"
import cart from "../../assets/Shop.svg"


export default function Header(){


    return(

        <div className={style.header}>
            <div className={style.logoContainer}>
                <Link to="/home">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className={style.userCartContainer}>
                <div className={style.user}>
                    <Link to="/">
                        <img src={user} alt="perfil" />
                    </Link>
                </div>
                <div style={{cursor: "pointer"}} className={style.cart}>
                    <img src={cart} alt="carrinho" />
                </div>
            </div>

        </div>

    )
}