import { useState } from "react";
import Footer from "./Footer";
import Header from "./header/Header";
import CartSlideOver from "./CartSlideOver";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {

  const [open, setOpen] = useState(false)

  return (
    <>
        <Header cartAction={() => setOpen(!open)} />
        <ToastContainer/>
        {children}
        <CartSlideOver open={open} setOpen={setOpen} />
        <Footer />
      </>
  )
}