import {loadEntreeComplet, loadEntreeCompletbylink, load} from "./loader";
import {displayEntrees,displayDepartements,displayEntreeComplet} from "./ui";
import { loadByName, loadDepartements, loadEntreesByDepartement } from "./loader";
import { basePathsApi } from "./const";
export { fusedEntreesLists, isAscending}


let isAscending = true;




let getEntrees = function (path) {
    let entrees = load(basePathsApi+'entrees');
    entrees.then(ent => {
        ent.json().then( ent => {
            displayEntrees(ent)
        })
    })
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
    //Récupère la liste des départements : 
    let listDep;

    let promises = []
    let promisesJson = []
    if (departementId == 0) {
        promises.push(load(basePathsApi+'entrees').then( entrees => {
            promisesJson.push(entrees.json().then(ent => {
                listDep = ent
                console.log('1')
            }))
        }))
    } else {
        promises.push(loadEntreesByDepartement(departementId).then( ent => {
            promisesJson.push(ent.json().then( ent => {
                listDep = ent
                console.log('2')
            }))
        }
        ))
    }
    //Récupération de la liste des entrées correspondant à la recherche
    let listSearch
    if (search === '') {
        promises.push(load(basePathsApi+'entrees').then( ent => {
            promisesJson.push(ent.json().then( ent => {
                listSearch = ent
                console.log('3')
            }))
        }))
    } else {
        promises.push(loadByName(search).then( ent => {
            promisesJson.push(ent.json().then( ent => {
                listSearch = ent
                console.log('4')
            }))
        }))
    } 
    Promise.all(promises).then(() => {
        Promise.all(promisesJson).then(() => {
            console.log(listSearch)
            listSearch.entrees = listSearch.entrees.filter(search => {
                return listDep.entrees.some(dep => search.entree.nom == dep.entree.nom);
            });
            console.log('fin')
            displayEntrees(listSearch);
        })
    })

}
// Fonction qui récupère les entrées grace au fonction loadEntrees et les affiche grace à displayEntrees
export let getEntreeComplet = function (entreeId) {
    let entree = loadEntreeComplet(entreeId);

    entree.then(ent => {
        ent.json().then( ent => {
            displayEntreeComplet(ent)
        })
    })
}
// Fonction qui récupère les entrées grace au fonction loadEntrees et les affiche grace à displayEntrees
export let getEntreeCompletbylink = function (link) {
    let entree = loadEntreeCompletbylink(link);

    entree.then(ent => {
        ent.json().then( ent => {
            displayEntreeComplet(ent)
        })
    })


}

document.getElementById('sortButton').addEventListener('click', function() {
    isAscending = !isAscending;
    this.textContent = isAscending ? 'Trier par ordre alphabétique ascendant' : 'Trier par ordre alphabétique descendant';
    fusedEntreesLists();
});

let searchBar = document.getElementById('search');
searchBar.addEventListener("input", (event) => {fusedEntreesLists(event)})
getEntrees()
getDepartement()