// src/App.js

import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { StateContext } from "./context/AuthContext.js";
import {Login, Signup} from "./pages/auth";
import Dashboard from "./pages/Dashboard.jsx";
import {ItemCategories, ItemCreate, ItemDetails, ItemList} from "./pages/Inventario";
import { List, ListCreate, ListDetails } from "./pages/Listas";
import { ProviderCreate, ProviderDetails, ProviderList } from "./pages/Proveedores";
import { QuotationCreate, QuotationList, QuotationDetails,QuotationPrint } from "./pages/Quotation";

import { CategoryList, SettingList, UserList } from "./pages/Settings";
import PrivateRoute from "./PrivateRoute.js";

function App() {
  return (
    <Router>
      <Toaster/>
      <StateContext>

      <Layout>
        <Routes>
            <Route path="/login" element={<Login/>}/>         
            <Route path="/signup" element={<Signup/>}/>         
            <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>         
            <Route path="/inventario" element={<PrivateRoute><ItemCategories /></PrivateRoute>}/>         
            <Route path="/inventario/crear" element={<PrivateRoute><ItemCreate /></PrivateRoute>}/>         
            <Route path="/inventario/:slug" element={<PrivateRoute><ItemList /></PrivateRoute>}/>         
            <Route path="/inventario/:slug/:slug" element={<PrivateRoute><ItemDetails /></PrivateRoute>}/>         
            <Route path="/proveedores" element={<PrivateRoute><ProviderList /></PrivateRoute>}/>         
            <Route path="/proveedores/crear" element={<PrivateRoute><ProviderCreate /></PrivateRoute>}/>         
            <Route path="/proveedores/:slug" element={<PrivateRoute><ProviderDetails /></PrivateRoute>}/>         
            <Route path="/cotizacion" element={<PrivateRoute><QuotationList /></PrivateRoute>}/>         
            <Route path="/cotizacion/crear" element={<PrivateRoute><QuotationCreate /></PrivateRoute>}/>         
            <Route path="/cotizacion/:noOrden" element={<PrivateRoute><QuotationDetails /></PrivateRoute>}/>         
            <Route path="/cotizacion/:noOrden/print" element={<PrivateRoute><QuotationPrint /></PrivateRoute>}/>         
            <Route path="/listas" element={<PrivateRoute><List /></PrivateRoute>}/>         
            <Route path="/listas/crear" element={<PrivateRoute><ListCreate /></PrivateRoute>}/>         
            <Route path="/listas/:slug" element={<PrivateRoute><ListDetails /></PrivateRoute>}/>         
            <Route path="/ajustes" element={<PrivateRoute><SettingList /></PrivateRoute>}/>         
            <Route path="/ajustes/categorias" element={<PrivateRoute><CategoryList /></PrivateRoute>}/>         
            <Route path="/ajustes/usuarios" element={<PrivateRoute><UserList /></PrivateRoute>}/>         
          </Routes>
      </Layout>
      </StateContext>
    </Router>
  );
}
export default App;