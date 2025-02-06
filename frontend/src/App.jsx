import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { authStore } from './store/auth.store'
import { useEffect } from 'react'
import CategoryPage from './pages/CategoryPage'
import CartItems from './pages/CartItems'
import PurchaseSuccess from './pages/PurchaseSuccess'
import { cartStore } from './store/cart.store'
function App() {
  let { userData , getUserData  } = authStore()
 
  let {addToCart,getCartItems} = cartStore()
  useEffect(() => {
    getCartItems()
}, [addToCart, getCartItems])

  useEffect(() => {
    getUserData()
  }, [getUserData])
  
  
  return (
    <>
      <Toaster />
      <Navbar />

      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={!userData ? <Login /> :<Navigate to={"/"} /> } path='/login' />
        <Route element={!userData ? <SignUp /> : <Navigate to={"/"} /> } path='/signup' />
        <Route element={userData?.role === "admin" ? <AdminDashboard /> : <Navigate to={"/login"} />} path='/admin' />
        <Route element={<CategoryPage/>}  path='/category/:category' />
        <Route element={userData ?  <CartItems/> : <Navigate to={"/login"}/>}  path='/cartItems' />
        <Route 
        path='/purchase-success'
        element={userData && <PurchaseSuccess />}  />
      </Routes>
    </>
  )
}

export default App
