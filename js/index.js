import {loadEntreeComplet, loadEntreeCompletbylink} from "./loader";
import {displayEntrees,displayDepartements,displayEntreeComplet} from "./ui";
import { loadDepartements, loadEntreesByNameDepartement  } from "./loader";
export { getEntreesLists, isAscending, getEntreeCompletbylink}


let isAscending = true;

let init = function () {
    document.getElementById('sortButton').addEventListener('click', function() {
        isAscending = !isAscending;
        getEntreesLists();
    });

    let searchBar = document.getElementById('search');
    searchBar.addEventListener("input", (event) => {getEntreesLists(event)})
    getEntreesLists()
    getDepartement()
}

// Fonction qui récupère les départements grace au fonction loadDepartements et les affiche grace à displayDepartements
let getDepartement = function () {
    let departements = loadDepartements();
    departements.then(dep => {
        dep.json().then( dep => {
            displayDepartements(dep)
        })
    })
}

//Fonction qui récupère la liste des entrées avec un loader puis les affiche 
let getEntreesLists = async  function (event) {
    //Récupération de la recherche et du département entrées pas l'utilisateur
    let search = document.getElementById('search').value
    let departementId = document.getElementById('departement').value

    //Chargement puis affichage des entrées correspondant aux informations récupérées 
    loadEntreesByNameDepartement(departementId, search).then(list => {
        list.json().then(list => {
            displayEntrees(list)
        })
    })
}

// Fonction qui récupère les entrées grace à la fonction loadEntree et les affiche grace à displayEntrees
let getEntreeCompletbylink = function (link) {
    let entree = loadEntreeCompletbylink(link);

    entree.then(ent => {
        ent.json().then( ent => {
            displayEntreeComplet(ent)
        })
    })
}

init()