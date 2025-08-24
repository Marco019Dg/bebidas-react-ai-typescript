import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import type { Recipe } from '../types';

export default function Modal() {

  const modal = useAppStore(state=> state.modal);
  const closeModal = useAppStore(state=> state.closeModal);
  const selectedRecipe = useAppStore(state=> state.selectedRecipe);
  const handleClickFavorite = useAppStore(state=> state.handleClickFavorite);
  const favoritesExist = useAppStore(state=> state.favoritesExist);
  


  /*OTRO MODO DE AGREGAR EL TITULO DE AGREGAR O ELIMINAR DE FAVORITOS
  const handleTitle = useMemo(()=>(id:Recipe["idDrink"])=>{
      return favorites.some(drink=>drink.idDrink === id)
  } , [favorites]) */

  

  const renderIngredients = ()=>{
    const ingredients: React.ReactNode[]= [];
    for(let x=1 ; x<=6 ; x++){
      const ingredient = selectedRecipe[`strIngredient${x}` as keyof Recipe];
      const measure = selectedRecipe[`strMeasure${x}` as keyof Recipe];
      if(ingredient && measure){
        ingredients.push(
          <li key={x} className=' text-lg font-normal'>
            {ingredient} - {measure}
          </li>
        )
      }
    }
    return ingredients;
  };


  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                      {selectedRecipe.strDrink}
                  </Dialog.Title>

                  <img 
                    src={selectedRecipe.strDrinkThumb} 
                    alt={`Imagen de: ${selectedRecipe.strDrink}`}
                    className='w-96 mx-auto' />

                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes y Cantidades
                  </Dialog.Title>
                    <ul>
                       {renderIngredients()}
                    </ul>
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instrucciones
                  </Dialog.Title>
                  <p className=' text-lg'> {selectedRecipe.strInstructions}</p>
                  <div className='flex justify-between items-center gap-4 mt-5'>
                    <button 
                      type="button"
                      className='w-full bg-gray-600 hover:bg-gray-500 rounded p-3 text-white text-center shadow font-bold uppercase cursor-pointer'
                      onClick={closeModal}>
                      Cerrar
                    </button>
                    <button 
                      type="button"
                      className='w-full bg-orange-600 hover:bg-orange-500 rounded p-3 text-white text-center shadow font-bold uppercase cursor-pointer'
                      onClick={()=>{
                        handleClickFavorite(selectedRecipe);
                        closeModal()
                      }}
                      >
                        {favoritesExist(selectedRecipe.idDrink) ?"Eliminar de favoritos" : "Agregar a Favoritos" }
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}