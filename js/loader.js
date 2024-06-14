//Fonctions qui récupèrent les infos de l'API
export {loadEntrees, loadByName}
import { basePathsApi } from "./const";

let loadEntrees = function (path) {
    let entrees = fetch(path).catch(error => {
        console.log(
        'network/response error :'
        +error);})
    return entrees 
}

let loadByName = function (search) {
    return loadEntrees(basePathsApi+'entrees/search?q='+search)
}