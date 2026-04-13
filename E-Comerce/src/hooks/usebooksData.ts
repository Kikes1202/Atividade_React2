import {useQuery} from "@tanstack/react-query";
import axios from "axios";
const API_URL = "http://localhost:3000/livros";
import type { BookData } from "../types/book-data";


const fetchData = async (): Promise<BookData[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const response = await axios.get(API_URL, {timeout: 5000});
    return response.data;
}

export default function useBookData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['book-data'],
        retry: false
    })

    return{
        ...query,
        data: query.data ?? []
    };
}