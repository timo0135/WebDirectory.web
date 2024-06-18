//Affichage avec Handlebars
import Handlebars from 'handlebars' ;
export {displayEntrees, displayDepartements, displayEntreesByDepartement, displayedList, displayEntreeComplet}
import {loadEntrees, loadEntreesByDepartement} from "./loader";
import {fusedEntreesLists, getEntreeComplet, getEntreeCompletbylink} from "./index";
import { racine, basePathsApi } from './const';

const p4Template = document.querySelector('#listeEntrees').innerHTML;
const entreesTemp = Handlebars.compile(p4Template);

const p5Template = document.querySelector('#displayFull').innerHTML;
const entreeFull = Handlebars.compile(p5Template);

let displayedList;
let isAscending = true;

document.getElementById('sortButton').addEventListener('click', function() {
    isAscending = !isAscending;
    let button = document.getElementById('sortButton');
    button.className = isAscending ? 'fa fa-sort-alpha-asc' : 'fa fa-sort-alpha-desc';
    displayEntrees(displayedList);
});

let displayEntrees = function (listeEntrees) {
    listeEntrees.entrees.sort((a, b) => isAscending ? a.entree.nom.localeCompare(b.entree.nom) : b.entree.nom.localeCompare(a.entree.nom));
    const promises = listeEntrees.entrees.map(entree =>
        loadEntrees(racine + entree.links.self.href).then(response =>
            response.json().then(ent => {
                entree.entree['img'] = racine + ent.links.image;
            })
        )
    );

    
    Promise.all(promises).then(() => {
        document.getElementById("entrees").innerHTML = entreesTemp({


            entree: listeEntrees.entrees,
            link:listeEntrees.links

        })
    
    listeEntrees.entrees.forEach(entree => {
        document.getElementById(entree.links.self.href).addEventListener("click", () => {
            getEntreeCompletbylink(entree.links.self.href)
        })

        });
    }).catch(error => {
        console.error("Une erreur s'est produite lors du chargement des entrées : ", error);
    });
    displayedList = listeEntrees;
}
let displayEntreesByDepartement = function (listeEntrees) {
    listeEntrees.entrees.sort((a, b) => a.entree.nom > b.entree.nom)
    document.getElementById("entrees").innerHTML = entreesTemp({
        entree:listeEntrees.entrees,
        //ajout de l'id pour chaque entree
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

    // ajout event listener  pour chaque département
       selectElement.addEventListener('change', fusedEntreesLists)
}
let displayEntreeComplet = function (entreecomplet) {
    // recuperer le modal
    let modal = document.getElementById("myModal");

    let modalcontent = document.getElementsByClassName('modal-content')[0]
    window.onclick = function(event) {
        console.log(event.target)
        if (!modalcontent.contains(event.target)) {
            modal.style.display = "none";
        }
    }
    
   // get the image
    entreecomplet.entree.img = racine+entreecomplet.links.image
    if (entreecomplet.entree.numeroTel2 != null) {
        entreecomplet.entree.numeroTel1 = ([entreecomplet.entree.numeroTel1,entreecomplet.entree.numeroTel2]).join(',')
    }
    console.log(entreecomplet.entree)
    document.getElementById("modal-text").innerHTML = entreeFull({
        entree:entreecomplet.entree
        //ajout de l'id pour chaque entree
    });
    // affichage du modal
    modal.style.display = "block";
}