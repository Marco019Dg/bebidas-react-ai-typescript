import {createOpenRouter} from '@openrouter/ai-sdk-provider';

export const openrouter = createOpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_KEY
});

//Esta función sirve para crear la instancia/configuración de cliente que se conecta con la API de OpenRouter
console.log("OPENROUTER_KEY:", import.meta.env.VITE_OPENROUTER_KEY);