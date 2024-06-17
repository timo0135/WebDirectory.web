//Affichage avec Handlebars
import Handlebars from 'handlebars' ;
export {displayEntrees, displayDepartements, displayEntreesByDepartement, displayedList, displayEntreeComplet}
import {loadEntrees, loadEntreesByDepartement} from "./loader";
import {getEntreeCompletbylink} from "./index";
import {getEntreeComplet} from "./index";
import { basePathsApi } from './const';
import {fusedEntreesLists} from "./index";
import { loadEntrees } from './loader';
import { racine } from './const';
const p4Template = document.querySelector('#listeEntrees').innerHTML;
const entreesTemp = Handlebars.compile(p4Template);

let displayedList;

let displayEntrees = function (listeEntrees) {
    listeEntrees.entrees.sort((a, b) => a.entree.nom > b.entree.nom)
    
    const promises = listeEntrees.entrees.map(entree =>
        loadEntrees(racine + entree.links.self.href).then(response =>
            response.json().then(ent => {
                entree.entree['img'] = racine + ent.links.image;
            })
        )
    );
    
    Promise.all(promises).then(() => {
        console.log(listeEntrees.links)
    document.getElementById("entrees").innerHTML = entreesTemp({
            // ajout d'un event listener pour chaque entree

        entree: listeEntrees.entrees,
        link:listeEntrees.links

    })
    listeEntrees.entrees.forEach(entree => {
        console.log(entree.links.self.href)
        document.getElementById(entree.links.self.href).addEventListener("click", () => {
            getEntreeCompletbylink(entree.links.self.href)
        })

        });
    }).catch(error => {
        console.error("Une erreur s'est produite lors du chargement des entrées : ", error);
    });
    
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

    // Add event listener for change event
       selectElement.addEventListener('change', fusedEntreesLists)
}
let displayEntreeComplet = function (entreecomplet) {
    // Get the modal
    let modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Display the entry details in the modal
    // Log entreecomplet.email to the console
    console.log('Email:', entreecomplet.entree.email);

    // Display the entry details in the modal
    let emailLink = entreecomplet.entree.email ? `<a href="mailto:${entreecomplet.entree.email}">${entreecomplet.entree.email}</a>` : '';
    document.getElementById("modal-text").innerHTML = `${JSON.stringify(entreecomplet)} ${emailLink}`;

    // Display the modal
    modal.style.display = "block";
}