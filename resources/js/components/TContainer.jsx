import { ToastContainer } from "react-toastify"

export default function TContainer () {
    return (
        <ToastContainer
            position="top-center"
            autoClose={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            limit={1}
        />
    )
}