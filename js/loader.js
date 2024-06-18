//Fonctions qui récupèrent les infos de l'API

import {basePathsApi, racine} from "./const";
export {loadEntrees, loadByName, loadEntreesByDepartement, loadDepartements , loadEntreeComplet, loadEntreeCompletbylink}

//Fonction qui récupère les entrées
let loadEntrees = async function (path) {
    let entrees = fetch(path).catch(error => {
        console.log(
        'network/response error :'
        +error);})
    return entrees 
}
//Fonction qui récupère les départements
let loadDepartements = async function () {
    return fetch(basePathsApi + 'services').catch(error => {
        console.log(
            'network/response error :'
            + error);
    })
}
//Fonction qui récupère les entrées par département
let loadEntreesByDepartement = async function (departementId) {
    return fetch(basePathsApi + 'services/' + departementId+'/entrees').catch(error => {
        console.log(
            'network/response error :'
            + error);
    })

}
//Fonction qui récupère les entrées par nom
let loadByName = async function (search) {
    return loadEntrees(basePathsApi+'entrees/search?q='+search)
}
//Fonction qui récupère une entrée complète
let loadEntreeComplet = function (entreeId) {
    return fetch(basePathsApi+'entrees/'+entreeId).catch(error => {
        console.log(
            'network/response error :'
            + error);
    })
}
//Fonction qui récupère une entrée complète par lien
let loadEntreeCompletbylink = function (link) {
    return fetch(racine+link).catch(error => {
        console.log(
            'network/response error :'
            + error);
    })
}