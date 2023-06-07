import { useParams } from "react-router-dom"



export default function DirView () {
    const {name} = useParams()
    
    return (
        <>
            Directory {name} !
        </>
    )
}