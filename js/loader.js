//Fonctions qui récupèrent les infos de l'API

import {basePathsApi, racine} from "./const";
import { isAscending } from "./index";
export {load, loadByName, loadEntreesByDepartement, loadDepartements , loadEntreeComplet, loadEntreeCompletbylink}

let load = async function (path) {
    let entrees = fetch(path).catch(error => {
        console.error(
        'network/response error :'
        +error);})
    return entrees 
}
let loadDepartements = async function () {
    return fetch(basePathsApi + 'services').catch(error => {
        console.error(
            'network/response error :'
            + error);
    })
}
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

let loadByName = async function (search) {
    let order = '&order=nom-'; 
    if (isAscending) {
        order += 'asc'
    } else {
        order += 'desc'
    }
    return load(basePathsApi+'entrees/search?q='+search+order)
}

let loadEntreeComplet = function (entreeId) {
    return fetch(basePathsApi+'entrees/'+entreeId).catch(error => {
        console.error(
            'network/response error :'
            + error);
    })
}

let loadEntreeCompletbylink = function (link) {
    return fetch(racine+link).catch(error => {
        console.error(
            'network/response error :'
            + error);
    })
}