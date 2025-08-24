
import {streamText} from "ai" // Sirve para generar y consumir texto del modelo de manera streaming.
import {openrouter} from "../lib/ai.ts" // La configuración creada para conectarse a la API de OpenRouter

export async function generateRecipeAI(prompt:string) {
    const result = streamText({
        model: openrouter("meta-llama/llama-3.3-70b-instruct:free"), //Nombre del modelo sacado de openrouter.ai
        prompt: prompt, //La consulta para la AI

        /*OPCIONES PARA CONTROLAR EL COMPORTAMIENTO DE LA IA (Opcional) :
        system:"Eres un bartender con 30 años de experiencia", // Personaje que adquiere el modelo
        temperature:0  // Su rango va de 0 (respuesta más determinista) a 1 (respuesta más random)
        */
    });
    /*Result dará como respuesta una serie de metodos, donde en el metodo "textSTream" estará la respuesta requerida*/
    return result.textStream
}



