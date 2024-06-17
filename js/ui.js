//Affichage avec Handlebars
import Handlebars from 'handlebars' ;
export {displayEntrees, displayDepartements, displayEntreesByDepartement, displayedList}
import {fusedEntreesLists} from "./index";
const p4Template = document.querySelector('#listeEntrees').innerHTML;
const entreesTemp = Handlebars.compile(p4Template);

let displayedList;

let displayEntrees = function (listeEntrees) {
    listeEntrees.entrees.sort((a, b) => a.entree.nom > b.entree.nom)
    document.getElementById("entrees").innerHTML = entreesTemp({
        entree:listeEntrees.entrees
    });
}
let displayEntreesByDepartement = function (listeEntrees) {
    listeEntrees.entrees.sort((a, b) => a.entree.nom > b.entree.nom)
    document.getElementById("entrees").innerHTML = entreesTemp({
        entree:listeEntrees.entrees
    });

}
let displayDepartements = function (listeDepartements) {
    let selectElement = document.getElementById("departement");
    listeDepartements.departements.sort((a, b) => a.departement.nom > b.departement.nom);
    // ajout d'un id 0 pour tous les départements
    let option = document.createElement("option");
    option.text = "Tous les départements";
    option.value = 0;
    selectElement.appendChild(option);
    listeDepartements.departements.forEach(departement => {
        let option = document.createElement("option");
        option.text = departement.departement.nom;
        option.value = departement.departement.id;
        selectElement.appendChild(option);
    });

    // Add event listener for change event
       selectElement.addEventListener('change', fusedEntreesLists)
}