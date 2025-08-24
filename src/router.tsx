import {lazy,Suspense} from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import Layout from "./layouts/Layout";
import GenerateAI from "./views/GenerateAi";

const FavoritesPage = lazy(()=>import("./views/FavoritesPage")) //Con lazy solo se cargará la página cuando sea solicitada, antes no.


export default function AppRouter() {
  return (
   <BrowserRouter>

        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<IndexPage/>} index />
                
                <Route path="/favoritos" element={
                  <Suspense fallback="Cargando..">
                    <FavoritesPage/>
                  </Suspense>
                } />

                <Route path="/generate" element={<GenerateAI/>} index />

            </Route>
        </Routes>

   </BrowserRouter>
  )
}
