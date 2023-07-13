import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { browserRouter } from '../routes/routes'
import { RouterProvider } from "react-router-dom"
import { CartProvider, useCart } from "react-use-cart"
import { AppProvider } from '../contexts/AppContext'
import { useAxiosPromise } from '../hooks/axios'

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
