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

        document.addEventListener()
    },

/*
    COPIE DE SPACE INVADERS
    initListeners : function(){
        //Controle du vaisseau principal
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'q':
                case 'ArrowLeft':
                    //Si le vaisseau est immobile
                    if(!self.animationFighter_query)
                        self.demarrerDeplacementGauche()
                    //Sinon si le vaisseau se déplace vers la droite
                    else if(Model.alienFighter.droite){
                        self.stopDeplacementFighter()
                        self.demarrerDeplacementGauche()
                    }
                    //Sinon le vaisseau se déplace déjà vers la gauche
                    break;

                case 'd':
                case 'ArrowRight':
                    //Si le vaisseau est immobile
                    if(!self.animationFighter_query)
                        self.demarrerDeplacementDroite()
                    //Sinon si le vaisseau se déplace vers la gauche
                    else if(Model.alienFighter.gauche){
                        self.stopDeplacementFighter()
                        self.demarrerDeplacementDroite()
                    }
                    //Sinon le vaisseau se déplace déjà vers la droite
                    break;

                case ' ':
                    self.faireTirerFighter()
                    break;
            }
        })

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'q':
                case 'ArrowLeft':
                    if(Model.alienFighter.gauche)
                        self.stopDeplacementFighter()
                    break;
                case 'd':
                case 'ArrowRight':
                    if(Model.alienFighter.droite)
                        self.stopDeplacementFighter()
                    break;
            }
        })
    }
    */
}

Controller.init();