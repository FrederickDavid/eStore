import React from 'react'
import Header from '../Header/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainScreen from './MainScreen'
import Register from '../Register/Register'
import SingIn from '../Register/SignIn'
import StoreScreen from '../eCommerce/StoreScreen'
import AddItem from '../eCommerce/AddItem'
import UpdateItem from '../eCommerce/UpdateItem'
import CartScreen from '../eCommerce/CartScreen'
import UpdateUser from './UpdateUser'
import Private from './Private'
import Payment from '../eCommerce/Payment'

const CrudApp = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/ViewUsers" element={<MainScreen/>}/>
                <Route path="/Register" element={<Register/>}/>
                {/* <Route path="/StoreScreen" element={<StoreScreen/>}/> */}
                <Route path="/SignIn" element={<SingIn/>}/>
                <Route path="/AddItem" element={<AddItem/>}/>
                <Route path="/UpdateItem/:id" element={<UpdateItem/>}/>
                <Route path="/UpdateUser/:id" element={<UpdateUser/>}/>
                <Route path="/CartScreen" element={<CartScreen/>}/>
                <Route path="/Payment" element={<Payment/>}/>
                <Route path="/" element={
              <Private>
                <StoreScreen />
              </Private>
            }
          />
            </Routes>
        </Router>
    )
}

export default CrudApp
