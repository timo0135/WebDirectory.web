import { loadEntrees } from "./loader";
import { displayEntrees, displayDepartements, displayEntreesByDepartement, displayedList } from "./ui";
import { loadByName, loadDepartements, loadEntreesByDepartement } from "./loader";
import { basePathsApi } from "./const";
export { fusedEntreesLists}

let getEntrees = function (path) {
    let entrees = loadEntrees(basePathsApi+'entrees');
    entrees.then(ent => {
        ent.json().then( ent => {
            displayEntrees(ent)
        })
    })
}
let getDepartement = function () {
    let departements = loadDepartements();
    departements.then(dep => {
        dep.json().then( dep => {
            displayDepartements(dep)
        })
    })
}

let searchBar = document.getElementById('search');
searchBar.addEventListener("input", (event) => {fusedEntreesLists(event)})

let fusedEntreesLists = async  function (event) {
    let search = document.getElementById('search').value
    let departementId = document.getElementById('departement').value
    //Récupère la liste des départements : 
    let listDep;
    if (departementId == 0) {
        await loadEntrees(basePathsApi+'entrees').then(async entrees => {
            await entrees.json().then(ent => {
                listDep = ent
            })
        })
    } else {
        await loadEntreesByDepartement(departementId).then(async ent => {
            await ent.json().then( ent => {
                listDep = ent
            })})
    }
    //Récupération de la liste des entrées correspondant à la recherche
    let listSearch
    if (search === '') {
        await loadEntrees(basePathsApi+'entrees').then(async ent => {
            await ent.json().then( ent => {
                listSearch = ent
            })
        })
    } else {
        await loadByName(search).then(async ent => {
            await ent.json().then( ent => {
                listSearch = ent
            })
        })
    } 
    listSearch.entrees = listSearch.entrees.filter(search => {
        return listDep.entrees.some(dep => search.entree.nom == dep.entree.nom);
    });

    displayEntrees(listSearch);
}
getEntrees()
getDepartement()