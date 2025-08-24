import { useAppStore } from "../stores/useAppStore"
import type { Drink } from "../types"

type DrinkCardProps = {
    drink: Drink
}



export default function DrinkCard({drink}:DrinkCardProps) {

    const selectRecipe = useAppStore(state=> state.selectRecipe)


  return (
    <div className="shadow-lg">
        <div className="overflow-hidden">
            <img src={drink.strDrinkThumb} 
             alt={`Imagen de ${drink.strDrink}`}
             className="hover:scale-125 transition-transform hover:rotate-2"
            />
        </div>

        <div className="p-5">
            <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
            <button 
                type="button"
                className="w-full p-3 bg-orange-400 hover:bg-orange-500 rounded-lg text-white mt-5 font-bold text-lg cursor-pointer"
                onClick={()=> selectRecipe(drink.idDrink)}>
                Ver Receta
            </button>
        </div>
    </div>
  )
}
