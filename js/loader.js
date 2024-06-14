//Fonctions qui récupèrent les infos de l'API
export {loadEntrees}
export {loadDepartements}
export {loadEntreesByDepartement}
import {basePathsApi} from "./const";

let loadEntrees = function () {
    let entrees = fetch(basePathsApi+'entrees').catch(error => {
        console.log(
        'network/response error :'
        +error);})
    return entrees 
}
let loadDepartements = function () {
    return fetch(basePathsApi + 'services').catch(error => {
        console.log(
            'network/response error :'
            + error);
    })
}
let loadEntreesByDepartement = function (departementId) {
    return fetch(basePathsApi + 'services/' + departementId+'/entrees').catch(error => {
        console.log(
            'network/response error :'
            + error);
    })

}