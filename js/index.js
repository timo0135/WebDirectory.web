import { loadEntrees } from "./loader";
import { displayEntrees } from "./ui";

let getEntrees = function () {
    entrees = loadEntrees();
    entrees.then(ent => {
        ent.json().then( ent => {
            displayEntrees(ent)
        })
    })
}

getEntrees()