import Cart from "../pages/Cart"
import Checkout from "../pages/checkout/Checkout"
import Home from "../pages/Home"
import OrderPlaced from "../pages/OrderPlaced"
import OrderHistory from "../pages/profile/OrderHistory"
import Shop from "../pages/Shop"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ProductDetails from "../pages/ProductDetails"
import NotFound from '../pages/errors/NotFound'
import { createBrowserRouter } from "react-router-dom"
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"
import UserProfile from "../pages/UserProfile"
import ReturnPolicy from "../pages/ReturnPolicy"
import PrivacyPolicy from "../pages/PrivacyPolicy"
import TermsAndConditions from "../pages/TermsAndConditions"

const routes = [

  {
    path: '/',
    name: 'home',
    displayName: 'Home',
    element: <Home/>,
    index: true,
    indexOrder: 1,
    errorElement: <NotFound/>
  },
  {
    path: '/shop/search',
    name: 'shop-search',
    displayName: 'Shop',
    element: <Shop/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/shop',
    name: 'shop',
    displayName: 'Shop',
    element: <Shop/>,
    index: true,
    indexOrder: 2,
    errorElement: <NotFound/>
  },
  {
    path: '/shop/product/:id',
    element: <ProductDetails/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/cart',
    element: <Cart/>,
    errorElement: <NotFound/>
  },
  {
    path: '/checkout',
    element: <Checkout/>,
    errorElement: <NotFound/>
  },
  {
    path: '/checkout/success',
    element: <OrderPlaced/>,
    errorElement: <NotFound/>
  },
  {
    path: '/login',
    element: <Login/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/register',
    element: <Register/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/reset-password',
    element: <ResetPassword/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/user/profile',
    element: <UserProfile/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/user/wishlist',
    element: <UserProfile/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/user/orders',
    element: <UserProfile/>,
    // element: <OrderHistory/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/user/refunds',
    element: <UserProfile/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/return-policy',
    element: <ReturnPolicy/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy/>,
    index: false,
    errorElement: <NotFound/>
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions/>,
    index: false,
    errorElement: <NotFound/>
  },
]

const browserRouter = createBrowserRouter(routes)

export {
  routes,
  browserRouter,
}