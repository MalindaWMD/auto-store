import React from 'react'
import ReactDOM from 'react-dom/client'
import { browserRouter } from '../routes/routes'
import { RouterProvider } from "react-router-dom"
import { CartProvider } from "react-use-cart"
import { AppProvider } from '../contexts/AppContext'

function Application() {
    return (
    <CartProvider>
      <AppProvider>
            <RouterProvider router={browserRouter} />
      </AppProvider>
    </CartProvider>
  );
}

export default Application;

if (document.getElementById('app')) {
  const Index = ReactDOM.createRoot(document.getElementById("app"));

  Index.render(
    <React.StrictMode>
      <Application />
    </React.StrictMode>
  )
}
