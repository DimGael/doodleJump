/** Constantes */
const FRAME_SETTINGS = {
    width:400,
    height:750
}

/**
 * Classe mère qui définit un objet pouvant être représenté dans la frame.
 * A une taille, et des coordonnées
 * 
 * @param {pixel} coordx 
 * @param {pixel} coordy 
 * 
 * @param {pixel} largeur
 * @param {pixel} hauteur
 */
var Entite = function(posX, posY, largeur, hauteur){
    this.posX = posX
    this.posY = posY
    this.largeur = largeur
    this.hauteur = hauteur
};

Entite.prototype.getX = function(){return this.posX}
Entite.prototype.getY = function(){return this.posY}
Entite.prototype.setX = function(newPosX){this.posX = newPosX}
Entite.prototype.setY = function(newPosY){this.posY = newPosY}


Entite.prototype.getLargeur = function(){ return this.largeur }
Entite.prototype.getHauteur = function(){ return this.hauteur }
Entite.prototype.setLargeur = function(newLargeur){ this.largeur = newLargeur }
Entite.prototype.setHauteur = function(newHauteur){ this.hauteur = newHauteur }

Entite.prototype.deplacerDroite = function(pixel){
    this.setX(this.getX() + pixel)

    if(this.getX() > FRAME_SETTINGS.width - this.getLargeur())
        this.setX(FRAME_SETTINGS.width - this.getLargeur())
};

Entite.prototype.deplacerGauche = function(pixel){
    this.setX(this.getX() - pixel)
    
    if(this.getX()<0)
        this.setX(0)
};

Entite.prototype.deplacerHaut = function(pixel){
    this.setY(this.getY() + pixel)

    if(this.getY() > FRAME_SETTINGS.height) //TODO c'est pas sur
        this.setY(FRAME_SETTINGS.height)
};

Entite.prototype.deplacerBas = function(pixel){
    this.setY(this.getY() - pixel)

    if(this.getY() < this.getHauteur())
        this.setY(this.getHauteur())
};



/**
 * Classe héritant de Entite.
 * Va définir le Doodler
 * @param {pixel} posX 
 * @param {pixel} posY 
 */
var Doodler = function(posX, posY){
    Entite.call(this, posX, posY, 50, 50)

    this.templateId = "doodler"
};
Doodler.prototype.getTemplateId = function(){return this.templateId}
Doodler.prototype = Object.create(Entite.prototype);
Doodler.prototype.constructor = Doodler

