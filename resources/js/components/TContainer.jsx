import { ToastContainer, cssTransition } from "react-toastify"
import '../../css/animations.css'

export default function TContainer() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={10000}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      limit={1}
      transition={cssTransition({
        enter: 'fade-in',
        exit: 'fade-out',
      })}
    />
  )
}