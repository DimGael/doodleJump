/**
 * Déclarée dans doodler.js
const FRAME_SETTINGS = {
    width:800,
    height:720
}
*/

//Constantes des paramètres du jeu
const GAME_SETTINGS = {
    vitesseDoodler : 6
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


var Model = {
    doodler: new Doodler(Number(FRAME_SETTINGS.width/2), 0),
}

var View = {
     // Récupère la frame dans laquelle les éléments sont ajoutés
    frame : document.getElementById("frame"),

     // Raffraichis l'affichage du doodler
    renderDoodler : function(doodler){
        var template = document.querySelector("#doodler");

        var clone = template.content.cloneNode(true).firstElementChild

        clone.style.left = doodler.getX()+"px";
        clone.style.bottom = doodler.getY()+"px";

        View.frame.append(clone);
    },

    clearFrame : function(){
        View.frame.innerHTML = ""
    }
};

var Controller = {
     //Variable qui va gérer le déplacement sur le côté du doodler
    animationDoodlerCote_query : null,


     //Raffraichis l'intégralité de la vue
    refreshAll : function(){
         //TODO ajouter les autres entités
        View.renderDoodler(Model.doodler)
    },

    init : function(){
        Controller.refreshAll()

        Controller.initListeners()
    },

    initListeners : function(){
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'q':
                case 'ArrowLeft':
                    //Si le doodler est immobile
                    if(!Controller.animationDoodlerCote_query)
                        Controller.demarrerDeplacementGauche()
                    //Sinon si le doodler se déplace vers la droite
                    else if(Model.doodler.droite){
                        Controller.stopDeplacementDoodler()
                        Controller.demarrerDeplacementGauche()
                    }
                    //Sinon le doodler se déplace déjà vers la gauche
                    break;

                case 'd':
                case 'ArrowRight':
                    //Si le doodler saute sur place (immobile)
                    if(!Controller.animationDoodlerCote_query)
                        Controller.demarrerDeplacementDroite()
                    //Sinon si le doodler se déplace vers la gauche
                    else if(Model.doodler.gauche){
                        Controller.stopDeplacementDoodler()
                        Controller.demarrerDeplacementDroite()
                    }
                    //Sinon le doodler se déplace déjà vers la droite
                    break;

                case ' ':
                    Controller.faireSauterDoodler()
                    break;
            }
        })

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'q':
                case 'ArrowLeft':
                    if(Model.doodler.gauche)
                        Controller.stopDeplacementDoodler()
                    break;
                case 'd':
                case 'ArrowRight':
                    if(Model.doodler.droite)
                        Controller.stopDeplacementDoodler()
                    break;
            }
        })
    },

    demarrerDeplacementGauche : function(){
        Model.doodler.gauche = true
        Controller.demarrerDeplacementDoodler()
    },

    demarrerDeplacementDroite : function(){
        Model.doodler.droite = true
        Controller.demarrerDeplacementDoodler()
    },

    stopDeplacementDoodler : function(){
        Model.doodler.droite = false
        Model.doodler.gauche = false

        window.cancelAnimationFrame(Controller.animationDoodlerCote_query)
        Controller.animationDoodlerCote_query = undefined
    },

    demarrerDeplacementDoodler : function(){
        var step = function(timestamp){
            if(Model.doodler.droite)
                Model.doodler.deplacerDroite(GAME_SETTINGS.vitesseDoodler)
            else if(Model.doodler.gauche)
                Model.doodler.deplacerGauche(GAME_SETTINGS.vitesseDoodler)
            else
                window.cancelAnimationFrame(Controller.animationDoodlerCote_query)
            View.clearFrame()
            View.renderDoodler(Model.doodler)
            Controller.animationDoodlerCote_query = window.requestAnimationFrame(step)
        }

        Controller.animationDoodlerCote_query = window.requestAnimationFrame(step)
    },

    faireSauterDoodler : function(){
        //TODO
        console.log("SAUT !")
    }
}

Controller.init();