import type { StateCreator } from "zustand";
import type { Recipe } from "../types";

type Notification = {
    text:string,
    error: boolean,
    show: boolean
};

export type FavoritesSliceType = {
    favorites: Recipe[],
    notification:Notification
    handleClickFavorite: (recipe:Recipe)=>void,
    favoritesExist: (id:Recipe["idDrink"])=>boolean
    loadFromStorage: ()=> void,
    showNotification: (datos: Pick<Notification, "text"|"error">)=> void
    hideNotification: ()=> void
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set,get)=>({
    favorites: [],

     notification:{
        text:"",
        error: false,
        show: false
    }, 

    handleClickFavorite: (recipe)=>{
        if(get().favoritesExist(recipe.idDrink)){
                set(state=>({
                    favorites: state.favorites.filter(element=>element.idDrink!==recipe.idDrink)
                }))
            get().showNotification({text:"Bebida eliminada de favoritos", error:false});
        }else{
            set(state=>({
                favorites: [...state.favorites, recipe]
            }))
            get().showNotification({text:"Bebida agregada a favoritos", error:false});
        }
        localStorage.setItem("favorites", JSON.stringify(get().favorites));
    },

    favoritesExist: (id)=>{
        return get().favorites.some(drink=>drink.idDrink===id)
    },

    loadFromStorage: ()=>{
        const storedFvorites= localStorage.getItem("favorites");
        if(storedFvorites){
            set({
                favorites: JSON.parse(storedFvorites)
            })
        }
    },

    showNotification: (datos)=>{
        set({
            notification: {
                text:datos.text,
                error:datos.error,
                show:true
            }
        })
        setTimeout(()=>{
            get().hideNotification()
        }, 3000)
    },

    hideNotification: ()=>set({
         notification: {
            text:"",
            error:false,
            show:false
        }
    })
}); 

