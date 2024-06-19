//Fonctions qui récupèrent les infos de l'API

import {basePathsApi, racine} from "./const";
import { isAscending } from "./index";
export {load, loadDepartements , loadEntreeComplet, loadEntreeCompletbylink, loadEntreesByNameDepartement}

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
    return load(basePathsApi + 'services')
}

let loadEntreesByNameDepartement = async function (departementId, searchContent) {
    //Construction de l'URl en fonction des informations fournies 
    let order = '?order=nom-'; 
    if (isAscending) {
        order += 'asc'
    } else {
        order += 'desc'
    }
    let dep = ''
    if (departementId != 0) {
        dep = 'services/'+departementId+'/'
    }
    let search1 = ''
    let search2 = ''
    if (searchContent !== '') {
        search1 = '&q='+searchContent;
        search2 ='/search'
    }
    return load(basePathsApi + dep+'entrees'+search2+order+search1)
}

//Fonction qui récupère une entrée complète
let loadEntreeComplet = function (entreeId) {
    return load(basePathsApi+'entrees/'+entreeId)
}
//Fonction qui récupère une entrée complète par lien
let loadEntreeCompletbylink = function (link) {
    return load(racine+link)
}