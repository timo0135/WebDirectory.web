import {loadEntreeComplet, loadEntreeCompletbylink} from "./loader";
import {displayEntrees,displayDepartements,displayEntreeComplet} from "./ui";
import { loadDepartements, loadEntreesByNameDepartement  } from "./loader";
export { fusedEntreesLists, isAscending, getEntreeComplet, getEntreeCompletbylink}


let isAscending = true;

let init = function () {
    document.getElementById('sortButton').addEventListener('click', function() {
    isAscending = !isAscending;
    fusedEntreesLists();
    });

    let searchBar = document.getElementById('search');
    searchBar.addEventListener("input", (event) => {fusedEntreesLists(event)})
    fusedEntreesLists()
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


let fusedEntreesLists = async  function (event) {
    let search = document.getElementById('search').value
    let departementId = document.getElementById('departement').value

    loadEntreesByNameDepartement(departementId, search).then(list => {
        list.json().then(list => {
            displayEntrees(list)
        })
    })
}

// Fonction qui récupère les entrées grace au fonction loadEntrees et les affiche grace à displayEntrees
let getEntreeComplet = function (entreeId) {
    let entree = loadEntreeComplet(entreeId);

    entree.then(ent => {
        ent.json().then( ent => {
            displayEntreeComplet(ent)
        })
    })
}
// Fonction qui récupère les entrées grace au fonction loadEntrees et les affiche grace à displayEntrees
let getEntreeCompletbylink = function (link) {
    let entree = loadEntreeCompletbylink(link);

    entree.then(ent => {
        ent.json().then( ent => {
            displayEntreeComplet(ent)
        })
    })
}

init()