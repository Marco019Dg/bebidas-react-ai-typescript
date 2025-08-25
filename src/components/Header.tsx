import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";



export default function Header() {

  const [searchFilters,setSearchFilters ] = useState({
    ingredient:"",
    category: ""
  })

  const {pathname} = useLocation();
  const isHome = useMemo(()=>pathname === "/" , [pathname])

  const fetchCategories = useAppStore(state=> state.fetchCategories);
  const categories = useAppStore(state=> state.categories);
  const searhRecipes = useAppStore(state=> state.searchRecipes)
  const showNotification = useAppStore(state=>state.showNotification)
  
  useEffect(()=> {fetchCategories()}, []) 

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLSelectElement>)=>{
    setSearchFilters({
      ...searchFilters,
      [e.target.name] : e.target.value
    })
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(Object.values(searchFilters).includes("")){
      showNotification({text:"Todos los campos son obligatorios", error:true})
      return;
    }
    searhRecipes(searchFilters)
  };

  return (
    <header className={isHome ? "image-header bg-center bg-cover" : "bg-blue-800"}>
        <div className=" py-16 px-5 container mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="logotipo"/>
                </div>
                <nav className="flex gap-4">
                  <NavLink 
                    to="/" 
                    className={({isActive})=> isActive ? "uppercase text-orange-500 font-bold" : "text-white uppercase font-bold"}>
                      Inicio
                  </NavLink>

                  <NavLink 
                    to="/favoritos" 
                    className={({isActive})=> isActive ? "uppercase text-orange-500 font-bold" : "text-white uppercase font-bold"}>
                      Favoritos
                  </NavLink>

                  <NavLink 
                    to="/generate" 
                    className={({isActive})=> isActive ? "uppercase text-orange-500 font-bold" : "text-white uppercase font-bold"}>
                      Generar con AI
                  </NavLink>
                </nav>
            </div>
            {/* El formulario se mostrará en el index unicamente. */}
            {isHome && (
              <form 
                className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="space-y-4">
                  <label 
                    htmlFor="ingredient"
                    className="block text-white uppercase font-extrabold text-lg">
                    Nombre o Ingredientes
                  </label>

                  <input 
                    type="text" 
                    id="ingredient" 
                    name="ingredient"
                    className="p-3 w-full rounded-lg focus:outline-none bg-white"
                    placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                    onChange={handleChange} 
                    value={searchFilters.ingredient}/>
                </div>

                <div className="space-y-4">
                  <label 
                    htmlFor="category"
                    className="block text-white uppercase font-extrabold text-lg">
                    Categoría:
                  </label>

                  <select
                    id="category" 
                    name="category"
                    className="p-3 w-full rounded-lg focus:outline-none bg-white"
                    onChange={handleChange}
                    value={searchFilters.category}
                   >
                      <option value="">--Seleccione--</option>
                      {categories.drinks.map((category)=>(
                        <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                      ))}
                      
                  </select>
                </div>
                <input 
                  type="submit"
                  value="Buscar recetas"
                  className=" cursor-pointer p-2 rounded-lg bg-orange-800 hover:bg-orange-900 w-full uppercase font-extrabold text-white"/>
              </form>
            )}
        </div>
    </header>
  )
}
