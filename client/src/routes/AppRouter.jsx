import { BrowserRouter, Routes, Route } from "react-router-dom";


import  Home  from "../pages/Home/Home"
import Auth from "../pages/Auth/Auth"
import Account from "../pages/Account/Account"
import Vehicles from "../pages/Vehicles/Vehicles"
import Schedule from "../pages/Schedule/Schedule"
import Vehicle from "../pages/Vehicle/Vehicle"
import Appointments from "../pages/Appointments/Appointments"
import MainLayout  from "../components/MainLayout";
import  ProtectedRoute  from '../components/ProtectedRoute'
import  PublicRoute  from '../components/PublicRoute'

const AppRouter = () =>{

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={ <MainLayout> <Home/> </MainLayout> }/>
            <Route path="/auth" element={ <PublicRoute>  <Auth/> </PublicRoute>  }/>
            <Route path="/vehicles" element={ <ProtectedRoute>  <MainLayout> <Vehicles/> </MainLayout>  </ProtectedRoute> } />
            <Route path="/account" element={ <ProtectedRoute>  <MainLayout> <Account/> </MainLayout>  </ProtectedRoute> } />
            <Route path="/schedule/:_id" element={ <ProtectedRoute>  <MainLayout> <Schedule/> </MainLayout>  </ProtectedRoute> } />
            <Route path="/vehicle/:_id" element={ <ProtectedRoute> <MainLayout> <Vehicle/> </MainLayout> </ProtectedRoute>}/>
            <Route path="/appointments" element={ <ProtectedRoute> <MainLayout> <Appointments/> </MainLayout> </ProtectedRoute>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter 