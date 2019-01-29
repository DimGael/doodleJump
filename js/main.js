/**
 * Déclarée dans doodler.js
const FRAME_SETTINGS = {
    width:400,
    height:750
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
     //Si deux doodlers sont présents, c'est qu'il traverse l'écran
    doodlers: [
        new Doodler(Number(FRAME_SETTINGS.width/2), 0),
        null
    ],

    getDoodlers : function(){
        if(!Model.doodlers[1])
            return [Model.doodlers[0]]
        else
            return Model.doodlers
    },
}

var View = {
     // Récupère la frame dans laquelle les éléments sont ajoutés
    frame : document.getElementById("frame"),

     // Raffraichis l'affichage du doodler
    renderDoodler : function(doodler){
        var template = document.querySelector("#doodler");

        var clone = template.content.cloneNode(true).firstElementChild
        
        if(doodler.regardeADroite)
            clone.classList.add("flip")
        else
            clone.classList.remove("flip")

        clone.style.left = doodler.getX()+"px";
        clone.style.bottom = doodler.getY()+"px";

        clone.style.height = doodler.getHauteur()+"px"
        clone.style.width = doodler.getLargeur()+"px"

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
        Model.getDoodlers().forEach(doodler => View.renderDoodler(doodler))
    },

    init : function(){
         //Initialise les listeners du joueur
        Controller.initListeners()

         //Affichage de tous les éléments de la frame
        Controller.refreshAll()
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
                    else if(Model.doodlers.droite){
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
                    else if(Model.doodlers.gauche){
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
                    if(Model.doodlers.gauche)
                        Controller.stopDeplacementDoodler()
                    break;
                case 'd':
                case 'ArrowRight':
                    if(Model.doodlers.droite)
                        Controller.stopDeplacementDoodler()
                    break;
            }
        })
    },

    demarrerDeplacementGauche : function(){
        Model.doodlers.gauche = true
        Model.getDoodlers().forEach(doodler => doodler.regarderAGauche())
        Controller.demarrerDeplacementDoodler()
    },

    demarrerDeplacementDroite : function(){
        Model.doodlers.droite = true
        Model.getDoodlers().forEach(doodler => doodler.regarderADroite())
        Controller.demarrerDeplacementDoodler()
    },

    stopDeplacementDoodler : function(){
        Model.doodlers.droite = false
        Model.doodlers.gauche = false

        window.cancelAnimationFrame(Controller.animationDoodlerCote_query)
        Controller.animationDoodlerCote_query = undefined
    },

    demarrerDeplacementDoodler : function(){
        var step = function(timestamp){
            if(Model.doodlers.droite)
                Model.getDoodlers().forEach(doodler => doodler.deplacerDroite(GAME_SETTINGS.vitesseDoodler))
            else if(Model.doodlers.gauche)
                Model.getDoodlers().forEach(doodler => doodler.deplacerGauche(GAME_SETTINGS.vitesseDoodler))
            else
                window.cancelAnimationFrame(Controller.animationDoodlerCote_query)

             // Réaffichage des entités
            View.clearFrame()
            Controller.refreshAll()

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