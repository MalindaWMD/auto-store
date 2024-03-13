import React, { useEffect, useState } from 'react'
import ReactGA from "react-ga4";
import TagManager from 'react-gtm-module'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { CartProvider } from "react-use-cart"
import { browserRouter } from '../routes/routes'
import { AppProvider } from '../contexts/AppContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function Application() {

  const queryClient = new QueryClient()

  useEffect(() => {
    ReactGA.initialize(process.env.MIX_GA_MEASUREMENT_ID);
    TagManager.initialize({
      gtmId: process.env.MIX_GTM_ID
    })
  })

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AppProvider>
          <RouterProvider router={browserRouter} />
        </AppProvider>
      </CartProvider>
    </QueryClientProvider>
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
