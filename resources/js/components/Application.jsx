import React from 'react'
import ReactDOM from 'react-dom/client'
import { browserRouter } from '../routes/routes'
import { RouterProvider } from "react-router-dom"
import { CartProvider } from "react-use-cart"
import { AppProvider } from '../contexts/AppContext'

function Application() {
  return (
    <AppProvider>
        <CartProvider>
          <RouterProvider router={browserRouter} />
        </CartProvider>
    </AppProvider>
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
