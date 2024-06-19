//Affichage avec Handlebars
import Handlebars from 'handlebars' ;
export {displayEntrees, displayDepartements, displayEntreeComplet}
import {load} from "./loader";
import {getEntreesLists, getEntreeCompletbylink, isAscending} from "./index";
import { racine } from './const';

// Déclaration des templates Handlebars 
const p4Template = document.querySelector('#listeEntrees').innerHTML;
const entreesTemp = Handlebars.compile(p4Template);

const p5Template = document.querySelector('#displayFull').innerHTML;
const entreeFull = Handlebars.compile(p5Template);

let displayEntrees = function (listeEntrees) {
    const promises = listeEntrees.entrees.map(entree =>
        load(racine + entree.links.self.href).then(response =>
            response.json().then(ent => {
                entree.entree['img'] = racine + ent.links.image;
            })
        )
    );
    
    Promise.all(promises).then(() => {
        document.getElementById("entrees").innerHTML = entreesTemp({
                // ajout d'un event listener pour chaque entree
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
       selectElement.addEventListener('change', getEntreesLists)
}
let displayEntreeComplet = function (entreecomplet) {
    // recuperer le modal
    let modal = document.getElementById("myModal");

    let modalcontent = document.getElementsByClassName('modal-content')[0]
    window.onclick = function(event) {
        if (!modalcontent.contains(event.target)) {
            modal.style.display = "none";
        }
    }
    
   // get the image
    entreecomplet.entree.img = racine+entreecomplet.links.image
    entreecomplet.entree.numeros = [entreecomplet.entree.numeroTel1]
    if (entreecomplet.entree.numeroTel2 != null) {
        entreecomplet.entree.numeros.push(entreecomplet.entree.numeroTel2)
    }
    document.getElementById("modal-text").innerHTML = entreeFull({
        entree:entreecomplet.entree
        //ajout de l'id pour chaque entree
    });
    // affichage du modal
    modal.style.display = "block";
}