//Affichage avec Handlebars
import Handlebars from 'handlebars' ;
export {displayEntrees}
const p4Template = document.querySelector('#listeEntrees').innerHTML;
const entreesTemp = Handlebars.compile(p4Template);

let displayEntrees = function (listeEntrees) {
    listeEntrees.entrees.sort((a, b) => a.entree.nom > b.entree.nom)
    document.getElementById("entrees").innerHTML = entreesTemp({ 
        entree:listeEntrees.entrees
    });
}
