//Fonctions qui récupèrent les infos de l'API
export {loadEntrees}
import { basePathsApi } from "./const";

let loadEntrees = function () {
    let entrees = fetch(basePathsApi+'entrees').catch(error => {
        console.log(
        'network/response error :'
        +error);})
    return entrees 
}