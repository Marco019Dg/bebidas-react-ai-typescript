 import { create } from "zustand";
 import { devtools } from "zustand/middleware";
 import { createRecipesSlice} from "./recipeSlice";
 import type {RecipesSliceType} from "./recipeSlice";
 import { createFavoritesSlice } from "./favoritesSlice";
 import type { FavoritesSliceType } from "./favoritesSlice";
 import { createAISlice } from "./aiSlice";
 import type { AISlice } from "./aiSlice";
 


 export const useAppStore = create <RecipesSliceType & FavoritesSliceType & AISlice>()(devtools((...a)=>({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createAISlice(...a)
   }))
 );