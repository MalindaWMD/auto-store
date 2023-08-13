import { ToastContainer, cssTransition } from "react-toastify"
import '../../css/animations.css'

export default function TContainer({ id, position='top-center'}) {
  return (
    <ToastContainer
      position={position}
      autoClose={5000}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      // limit={1}
      containerId={id}
      transition={cssTransition({
        enter: 'fade-in',
        exit: 'fade-out',
      })}
    />
  )
}