import axios from 'axios'

const api = axios.create({
	baseURL : 'https://www.thecocktaildb.com/api/json/v1/1'
});

//baseURL → prefijo que se agregará automáticamente a todas las rutas.
/*Se crea una instancia personalizada de Axios con una configuración inicial.
En este caso:
Cada vez que use esta instancia, la baseURL será https://www.thecountriesdb.com/api/json/v1/1.*/

export default api

/*Se exporta esta instancia para poder reutilizarla en cualquier parte del proyecto sin tener que reescribir la baseURL cada vez. */