import {createBrowserRouter} from "react-router-dom";
import Home from "./components/home/home.tsx";
import ListaGeneros from "./components/generos/generos.tsx";
import Login from "./components/login/login.tsx";
import DetalhesLivros from "./components/bookDetails/bookDetails.tsx";

const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home/> 
    },
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/generos/:genero",
        element: <ListaGeneros/>
    },
    {
        path: "/bookDetails/:id",
        element: <DetalhesLivros/>
    }

])

export default router;
