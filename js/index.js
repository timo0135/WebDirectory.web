import { loadEntrees } from "./loader";
import { displayEntrees, displayDepartements, displayEntreesByDepartement, displayedList } from "./ui";
import { loadByName, loadDepartements, loadEntreesByDepartement } from "./loader";
import { basePathsApi } from "./const";
export { getEntreesByDepartement}

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
let getEntreesByDepartement = function (departementId) {
    let entrees = loadEntreesByDepartement(departementId);
    console.log(entrees)
    entrees.then(ent => {
        ent.json().then( ent => {
            displayEntreesByDepartement(ent)
        })})

}

let searchBar = document.getElementById('search');
searchBar.addEventListener("input", (event) => {
    if (event.target.value === '') {
        getEntreesByDepartement()
    } else {
        let entrees = loadByName(event.target.value)
        entrees.then(ent => {
            ent.json().then( ent => {
                displayEntrees(fuseEntreesLists(ent))
            })
        })
    }
});

let fuseEntreesLists = function (SearchList) {
    let departementList = displayedList;
    SearchList.entrees.filter((a) => {departementList.entrees.includes(a)})
    return SearchList;
}
getEntrees()
getDepartement()