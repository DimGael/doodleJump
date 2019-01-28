const FRAME_SETTINGS = {
    width:800,
    height:720
}


var Model = {
    doodler: {
        posX : Number(FRAME_SETTINGS.width/2),
        posY : 0
    }
}

var View = {
     // Récupère la frame dans laquelle les éléments sont ajoutés
    getFrame : function(){
      return document.getElementById("frame");
    },

     // Raffraichis l'affichage du doodler
    renderDoodler : function(doodler){
        var template = document.querySelector("#doodler");

        var clone = template.content.cloneNode(true).firstElementChild

        clone.style.left = doodler.posX+"px";
        clone.style.bottom = doodler.posY+"px";

        View.getFrame().append(clone);
    }
}

var Controller = {

     //Raffraichis l'intégralité de la vue
    refreshAll : function(){
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
                    if(!Controller.animationDoodler_query)
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
                    if(!Controller.animationDoodler_query)
                        Controller.demarrerDeplacementDroite()
                    //Sinon si le doodler se déplace vers la gauche
                    else if(!Model.doodler.droite){
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
                    if(!Model.doodler.droite)
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
        //TODO
        Model.doodler.droite = false
        Controller.demarrerDeplacementDoodler()
    },

    demarrerDeplacementDroite : function(){
        //TODO
        Model.doodler.droite = true
        Controller.demarrerDeplacementDoodler()
    },

    stopDeplacementDoodler : function(){
        //TODO
        console.log("Le doodler arrete de bouger")
        Controller.animationDoodler_query = false
    },

    demarrerDeplacementDoodler : function(){
        //TODO
        if(Model.doodler.droite)
            console.log("Le doodler va a droite")
        else
            console.log("le doodler va a gauche")


        Controller.animationDoodler_query = true
    },

    faireSauterDoodler : function(){
        //TODO
        console.log("SAUT !")
    }
}

Controller.init();