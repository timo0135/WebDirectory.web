import { loadEntrees } from "./loader";
import { displayEntrees } from "./ui";
import { loadByName } from "./loader";
import { basePathsApi } from "./const";

let getEntrees = function (path) {
    let entrees = loadEntrees(basePathsApi+'entrees');
    entrees.then(ent => {
        ent.json().then( ent => {
            displayEntrees(ent)
        })
    })
}
let searchBar = document.getElementById('search');
searchBar.addEventListener("input", (event) => {
    if (event.target.value === '') {
        getEntrees()
    } else {
        let entrees = loadByName(event.target.value)
        entrees.then(ent => {
            ent.json().then( ent => {
                displayEntrees(ent)
            })
        })
    }
    
});
getEntrees()