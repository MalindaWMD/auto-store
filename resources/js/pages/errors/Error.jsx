import { log } from "console"
import { useRouteError } from "react-router"

export default function Error () {

    let error = useRouteError()
    
    return (<>ERRROR</>)
}