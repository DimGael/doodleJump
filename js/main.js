/** Constantes */
const FRAME_SETTINGS = {
    width:500,
    height:750
}


//Constantes des paramètres du jeu
const GAME_SETTINGS = {
    vitesseDoodler : 7,
    vitesseSautDoodler : 6,
    hauteurSautDoodler : 300,
    hauteurCamera : 400,
    vitesseCamera : 10,
    doodlerPeutTomber : false,

    vitesseMaxPlateformeMouvante : 5,
    vitesseMinPlateformeMouvante : 1,

    longueurDeplacementMaxPlateformeMouvante: 200,
    longueurDeplacementMinPlateformeMouvante : 50
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


var Model = {
     //Si deux doodlers sont présents, c'est qu'il traverse l'écran
    doodlers: [
        new Doodler(Number(FRAME_SETTINGS.width/2), 0)
    ],

    getDoodlers : function(){
        return Model.doodlers
    },

    plateformes : [],
    dernierePlateforme : undefined,

    getAllEntities : function(){
        //Rajouter les autres entités si besoin
        return Model.doodlers
            .concat(Model.plateformes)
    },
}

var View = {
     // Récupère la frame dans laquelle les éléments sont ajoutés
    frame : document.getElementById("frame"),
    renderScore : function(score){
        var template = document.querySelector("#score");

        var clone = template.content.cloneNode(true).firstElementChild
        clone.innerText=score;

        View.frame.append(clone);

    },

    renderEntity : function(entity){
        if(entity){
            var node = View.createEntity(entity)
            if (node)
                View.frame.append(node);
        }
    },

    createEntity: function(entity){
        if (entity.getY() > FRAME_SETTINGS.height || entity.getY() < 0)
            return null

        var template = document.querySelector("#"+entity.getTemplateId());

        var clone = template.content.cloneNode(true).firstElementChild

        clone.style.left = entity.getX()+"px";
        clone.style.bottom = entity.getY()+"px";

        clone.style.height = entity.getHauteur()+"px"
        clone.style.width = entity.getLargeur()+"px"

        //Traitement spéciaux en fonction du type d'entité
        if (entity instanceof Plateforme){
            clone.style.backgroundColor = entity.couleur
        }
        else if (entity instanceof Doodler){
            if(entity.regardeADroite)
                clone.classList.add("flip")
            else
                clone.classList.remove("flip")
        }

        return clone;
    },

    clearFrame : function(){
        View.frame.innerHTML = ""
    }
};

var Controller = {
     //Variables qui va gérer le déplacement sur le côté du doodler
    animationDoodlerCote_query : null,
    animationDoodlerSaut_query : null,
    animationCamera_query : null,
    animationPlateforme_query:null,

    score : 0,


     //Raffraichis l'intégralité de la vue
    refreshAll : function(){
        View.clearFrame();
        View.renderScore(Controller.score)
        Model.getAllEntities().forEach(entity => View.renderEntity(entity))
    },

    init : function(){
         //Initialise les listeners du joueur
        Controller.initListeners()

        //Création des plateformes
        Controller.genererNouvellesPlateformesStandard(25);
        Controller.genererNouvellesPlateformesPiegees(3);
        Controller.genererNouvellesPlateformesMouvantes(5);

        //Démarre directement l'animation de saut du doodler
        Controller.faireSauterDoodler()

        Controller.demarrerAnimationPlateformeMouvante()

        //Affichage de tous les éléments de la frame
        Controller.refreshAll()

    },

    perdu : function(){
        if (Controller.animationDoodlerCote_query){
            window.cancelAnimationFrame(Controller.animationDoodlerCote_query)
        }
        
        if (Controller.animationDoodlerSaut_query){
            window.cancelAnimationFrame(Controller.animationDoodlerSaut_query)
        }

        if (Controller.animationCamera_query){
            window.cancelAnimationFrame(Controller.animationCamera_query)
        }

        if (Controller.animationPlateforme_query){
            window.cancelAnimationFrame(Controller.animationPlateforme_query)
        }

        Model.plateformes = []

        Model.doodlers = []

        View.clearFrame()

        alert("Perdu ! Voici votre score : " + Controller.score)
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

    demarrerAnimationPlateformeMouvante : function(){
        var step = function(timestamp){
            Model.plateformes.forEach((plateforme) => {
                if(plateforme instanceof PlateformeMouvante){
                    if(plateforme.vaADroite()){
                        plateforme.deplacerDroite(plateforme.getVitesse())
                        if (plateforme.getX() >= plateforme.getBaseX() + plateforme.getLongueurDeplacement())
                            plateforme.changeDeSens()
                    }
                    else{
                        plateforme.deplacerGauche(plateforme.getVitesse())
                        if (plateforme.getX() <= plateforme.getBaseX())
                            plateforme.changeDeSens()
                    }
                }
            })

            Controller.animationPlateforme_query = window.requestAnimationFrame(step)
        }

        Controller.animationPlateforme_query = window.requestAnimationFrame(step)
    },

    demarrerDeplacementDoodler : function(){
        var step = function(timestamp){
            if(Model.doodlers.droite)
                Model.getDoodlers().forEach(doodler => doodler.deplacerDroite(GAME_SETTINGS.vitesseDoodler))
            else if(Model.doodlers.gauche)
                Model.getDoodlers().forEach(doodler => doodler.deplacerGauche(GAME_SETTINGS.vitesseDoodler))
            else
                window.cancelAnimationFrame(Controller.animationDoodlerCote_query)

            Model.getDoodlers().forEach(doodler => {
                if(doodler.existeCollisionFrameDroite())
                    Controller.onCollisionDoodlerDroite()
                else if(doodler.existeCollisionFrameGauche())
                    Controller.onCollisionDoodlerGauche()
            })

            //Si un doodler est sorti de la frame, le supprime
            Model.doodlers.forEach((doodler, index) => {
                if(doodler.estSortiFrame())
                    Model.doodlers.splice(index, 1)
            })

             // Réaffichage des entités
            Controller.refreshAll()

            Controller.animationDoodlerCote_query = window.requestAnimationFrame(step)
        }

        Controller.animationDoodlerCote_query = window.requestAnimationFrame(step)
    },

    demarrerAnimationSaut : function(){

        var step = function(timestamp){
            Model.doodlers.forEach((doodler, index) => {

                if (doodler.getY()<doodler.baseSaut + GAME_SETTINGS.hauteurSautDoodler &&
                    doodler.isJumping()){
                    doodler.deplacerHaut(GAME_SETTINGS.vitesseSautDoodler)
                }
                else{
                    doodler.setJump(false);
                    doodler.deplacerBas(GAME_SETTINGS.vitesseSautDoodler)
                }

                if(!doodler.isJumping()){
                    Model.plateformes.forEach((plateforme, indexPlateforme) => {
                        if (Controller.detecterCollisionDoodlerPlateforme(doodler, plateforme)){
                            if (plateforme instanceof PlateformePiege){
                                Model.plateformes.splice(indexPlateforme, 1);
                            }else {
                                Model.doodlers.forEach((myDoodler) => {
                                    myDoodler.setBaseSaut(plateforme.getY())
                                    myDoodler.setJump(true)
                                })
                            }
                        }
                    })
                }

                //Si le doodler dépasse une certaine hauteur, la camera descend
                if (doodler.getBaseSaut() + GAME_SETTINGS.hauteurSautDoodler >= GAME_SETTINGS.hauteurCamera){
                    GAME_SETTINGS.doodlerPeutTomber = true;
                    Controller.demarrerAnimationCamera();
                }
                
    
                if (doodler.getY() <= 0){
                    if(GAME_SETTINGS.doodlerPeutTomber){
                        Controller.perdu()
                    }
                    else{
                        doodler.setJump(true)
                    }
                }
            })

            Controller.refreshAll()

            Controller.animationDoodlerSaut_query = window.requestAnimationFrame(step)   
        };

        if (Controller.animationDoodlerSaut_query !== undefined)
            Controller.animationDoodlerSaut_query = window.requestAnimationFrame(step)
    },

    /**
     * Méthode qui va faire descendre les plateformes et les entités si le doodler est trop haut
     */
    demarrerAnimationCamera : function(){
        Controller.score=Controller.score+20;
        //La vitesse du doodler est ralentie tant que la caméra bouge
        var tempVitesseSautDoodler = GAME_SETTINGS.vitesseSautDoodler

        if (!Controller.animationCamera_query){            
            var step = function(timestamp){
                var doodlerData = Model.getDoodlers()[0];

                //Il faut que les plateformes descendent ainsi que le doodler jusqu'à ce que la base saut du doodler soit à 50
                if (doodlerData.getBaseSaut() !== 0 && doodlerData.getBaseSaut() > 50){
                    GAME_SETTINGS.vitesseSautDoodler = tempVitesseSautDoodler - 5 

                    Model.plateformes.forEach((plateforme, indexPlateforme) => {
                        plateforme.deplacerBas(GAME_SETTINGS.vitesseCamera)
                        if (plateforme.getY() <= 0)
                            Model.plateformes.splice(indexPlateforme, 1)

                    })

                    //Test si la plus haute plateforme est affichée à l'écran, si oui
                    if (Model.dernierePlateforme.getY() <= FRAME_SETTINGS.height){
                        Controller.genererNouvellesPlateformesStandard(5);
                        while(Model.dernierePlateforme.getY() < FRAME_SETTINGS.height)
                            Controller.genererNouvellesPlateformesStandard(5);

                        Controller.genererNouvellesPlateformesPiegees(5);
                        Controller.genererNouvellesPlateformesMouvantes(3);
                        console.log("regénération")
                    }

                    Model.doodlers.forEach(doodler =>{
                        doodler.setBaseSaut(doodlerData.getBaseSaut() - GAME_SETTINGS.vitesseCamera)
                    })

                    Controller.animationCamera_query = window.requestAnimationFrame(step);
                }
                else{
                    window.cancelAnimationFrame(Controller.animationCamera_query);
                    Controller.animationCamera_query = null;
                    GAME_SETTINGS.vitesseSautDoodler = tempVitesseSautDoodler
                }
                    
            }

            Controller.animationCamera_query = window.requestAnimationFrame(step);
        }
    },

    detecterCollisionDoodlerPlateforme: function(doodler, plateforme){
        //Tester si les pieds du doodler sont
        let result = false;

        if(doodler.getY() >= plateforme.getY() && doodler.getY() <= plateforme.getY()+plateforme.getHauteur()){

            if ((doodler.getX()-10 >= plateforme.getX() && doodler.getX()-10 <= plateforme.getX()+plateforme.getLargeur())
                || (doodler.getX()+doodler.getLargeur() >= plateforme.getX() && doodler.getX()+doodler.getLargeur() <= plateforme.getX()+plateforme.getLargeur())){

                    result = true;
            }
        }

        return result;
    },

    onCollisionDoodlerDroite : function(){
        //S'il n'y a qu'un seul doodler dans la frame
        if(Model.doodlers.length == 1){
            var firstDoodler = Model.getDoodlers()[0];

            var newDoodler = new Doodler(
                firstDoodler.getX() - FRAME_SETTINGS.width,
                firstDoodler.getY()
            )

            Controller.copierDonneesDoodler(firstDoodler, newDoodler)

            Model.doodlers.push(newDoodler)
        }
    },

    onCollisionDoodlerGauche : function(){
        //S'il n'y a qu'un seul doodler dans la frame
        if(Model.doodlers.length == 1){
            var firstDoodler = Model.getDoodlers()[0];

            var newDoodler = new Doodler(
                firstDoodler.getX() + FRAME_SETTINGS.width,
                firstDoodler.getY()
            )

            Controller.copierDonneesDoodler(firstDoodler, newDoodler)

            Model.doodlers.push(newDoodler)
        }
    },

    copierDonneesDoodler: function(doodler, newDoodler){
        if(doodler.regardeADroite){
            //Le nouveau doodler apparaît à gauche
            newDoodler.regarderADroite()
        }
        else{
            //Le nouveau doodler apparaît à droite
            newDoodler.regarderAGauche()
        }

        newDoodler.setJump(doodler.isJumping())

        newDoodler.setBaseSaut(doodler.getBaseSaut())
    },

    faireSauterDoodler : function(){
        Model.doodlers.forEach(doodler => doodler.setJump(true));
        Controller.demarrerAnimationSaut()

    },
    
    genererNouvellesPlateformesStandard: function(nbPlateformes){

        for(let i = 0; i<nbPlateformes; i++){
            if (Model.dernierePlateforme){
                Model.dernierePlateforme = new PlateformeStandard(
                    Math.random()*(FRAME_SETTINGS.width-80),
                    Model.dernierePlateforme.getY() + Math.random()*GAME_SETTINGS.hauteurSautDoodler-20
                );

                Model.plateformes.push(Model.dernierePlateforme);
            }
            else {
                Model.dernierePlateforme = new PlateformeStandard(
                    Math.random()*(FRAME_SETTINGS.width-80),
                    Math.random()*GAME_SETTINGS.hauteurSautDoodler-20
                );
                Model.plateformes.push(Model.dernierePlateforme);
            }
        }
    },

    genererNouvellesPlateformesPiegees: function(nbPlateformes){
        for(let i = 0; i<nbPlateformes; i++){

            Model.plateformes.push(new PlateformePiege(
                Math.random()*(FRAME_SETTINGS.width-80),
                Math.random()*FRAME_SETTINGS.height + FRAME_SETTINGS.height
            ));

        }
    },

    genererNouvellesPlateformesMouvantes: function (nbPlateformes) {
        for(let i = 0; i<nbPlateformes; i++){

            let vitesseAlea = GAME_SETTINGS.vitesseMaxPlateformeMouvante - GAME_SETTINGS.vitesseMinPlateformeMouvante
            vitesseAlea = GAME_SETTINGS.vitesseMinPlateformeMouvante + Math.random()*vitesseAlea

            let longueurDeplacementAlea = GAME_SETTINGS.longueurDeplacementMaxPlateformeMouvante - GAME_SETTINGS.longueurDeplacementMinPlateformeMouvante
            longueurDeplacementAlea = GAME_SETTINGS.longueurDeplacementMinPlateformeMouvante + Math.random()*longueurDeplacementAlea

            Model.plateformes.push(new PlateformeMouvante(
                Math.random()*(FRAME_SETTINGS.width-80),
                Math.random()*FRAME_SETTINGS.height + FRAME_SETTINGS.height,
                vitesseAlea,
                longueurDeplacementAlea
            ));

        }
    },

}

Controller.init();