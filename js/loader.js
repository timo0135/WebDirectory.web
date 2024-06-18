//Fonctions qui récupèrent les infos de l'API

import {basePathsApi, racine} from "./const";
import { isAscending } from "./index";
export {load, loadByName, loadEntreesByDepartement, loadDepartements , loadEntreeComplet, loadEntreeCompletbylink}

//Fonction qui récupère les entrées
let load = async function (path) {
    let entrees = fetch(path).catch(error => {
        console.error(
        'network/response error :'
        +error);})
    return entrees 
}
//Fonction qui récupère les départements
let loadDepartements = async function () {
    return fetch(basePathsApi + 'services').catch(error => {
        console.error(
            'network/response error :'
            + error);
    })
}
//Fonction qui récupère les entrées par département
let loadEntreesByDepartement = async function (departementId) {
    let order = '?order=nom-'; 
    if (isAscending) {
        order += 'asc'
    } else {
        order += 'desc'
    }
    return fetch(basePathsApi + 'services/' + departementId+'/entrees'+order).catch(error => {
        console.error(
            'network/response error :'
            + error);
    })

}
//Fonction qui récupère les entrées par nom
let loadByName = async function (search) {
    let order = '&order=nom-'; 
    if (isAscending) {
        order += 'asc'
    } else {
        order += 'desc'
    }
    return load(basePathsApi+'entrees/search?q='+search+order)
}
//Fonction qui récupère une entrée complète
let loadEntreeComplet = function (entreeId) {
    return fetch(basePathsApi+'entrees/'+entreeId).catch(error => {
        console.error(
            'network/response error :'
            + error);
    })
}
//Fonction qui récupère une entrée complète par lien
let loadEntreeCompletbylink = function (link) {
    return fetch(racine+link).catch(error => {
        console.error(
            'network/response error :'
            + error);
    })
}