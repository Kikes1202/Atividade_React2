import style from "./style.module.css"
import ambiente from "../../assets/Picture.png"
import logo from "../../assets/Logo (Stroke).svg"
import { useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"




interface LoginRequest{
    email: string,
    senha: string
}


export default function Login(){

    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>()
    const navigate = useNavigate()

    function onSubmit(_data: LoginRequest){
        navigate("/home")
    }

   return( 
    <>
        <div className={style.main}>
            <div className={style.imgSection}>
                <img src={ambiente} alt="ambiente" />
            </div>
            <div className={style.welcomeSection}>
                    <div className={style.logoContainer}>
                        <img src={logo} alt="logo" />
                    </div>
                <div className={style.header}>
                    <h3 style={{color: "#09093799", fontWeight: "600", fontSize: "24px"}}>Bem vindo(a)!</h3>
                    <h2 style={{color: "#090937", fontWeight: "700", fontSize: "32px"}}>Entre na sua conta</h2>
                </div>

                <div className={style.loginContainer}>
                    <div className={style.formContainer}>
                        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={style.email}>
                                <h3>E-mail</h3>
                                <input  type="email" placeholder="Digite o seu E-mail" style={{fontWeight: "400",fontSize: '20px', padding: "1rem", width: "100%", height:"60px", backgroundColor: "#F4F4FF", border: "none"}}
                                    {...register("email", {
                                        required: "Email é obrigatório"
                                    })}/>
                                    {errors.email && <span style={{ color: "red", fontSize: "14px" }}>{errors.email.message}</span>}

                            </div>
                            <div className={style.senha}>
                                <h3>Senha</h3>
                                <input placeholder="Digite a sua Senha" style={{fontWeight: "400",fontSize: '20px',padding: "1rem", width: "100%", height:"60px", backgroundColor: '#F4F4FF', border: "none"}} type="password"
                                    {...register("senha", {
                                        required: "Senha é obrigatória",
                                        minLength: {
                                            value: 8,
                                            message: "A senha deve ter no mínimo 8 caracteres"
                                        }
                                    })} />
                                    {errors.senha && <span style={{ color: "red", fontSize: "14px" }}>{errors.senha.message}</span>}

                            </div>

                            <div className={style.buttonContainer}>
                                <button style={{fontWeight: "600", cursor: "pointer"  }} type="submit" className={style.entrar}>
                                    Entrar
                                </button>
                                <button type="button" style={{fontWeight: "600", cursor:"pointer"  }} className={style.cadastre}>
                                    Cadastre-se
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

                

            </div>
        
        </div>
    
    </>

   )

}