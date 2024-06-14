import { loadEntrees } from "./loader";
import {displayDepartements, displayEntrees, displayEntreesByDepartement} from "./ui";
import { loadDepartements } from "./loader";
import { loadEntreesByDepartement } from "./loader";
export {getEntreesByDepartement}
let getEntrees = function () {
    let entrees = loadEntrees();
    console.log(entrees)
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

getEntrees()
getDepartement()
getEntreesByDepartement(2)