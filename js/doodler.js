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
    this.templateId = null
};

Entite.prototype.getX = function(){return this.posX}
Entite.prototype.getY = function(){return this.posY}
Entite.prototype.setX = function(newPosX){this.posX = newPosX}
Entite.prototype.setY = function(newPosY){this.posY = newPosY}

Entite.prototype.setTemplateId = function(newTemplateId){ this.templateId = newTemplateId }
Entite.prototype.getTemplateId = function(){ return this.templateId }

Entite.prototype.getLargeur = function(){ return this.largeur }
Entite.prototype.getHauteur = function(){ return this.hauteur }
Entite.prototype.setLargeur = function(newLargeur){ this.largeur = newLargeur }
Entite.prototype.setHauteur = function(newHauteur){ this.hauteur = newHauteur }

Entite.prototype.deplacerDroite = function(pixel){
    this.setX(this.getX() + pixel)
};

Entite.prototype.deplacerGauche = function(pixel){
    this.setX(this.getX() - pixel)
};

Entite.prototype.deplacerHaut = function(pixel){
    this.setY(this.getY() + pixel)
};

Entite.prototype.deplacerBas = function(pixel){
    this.setY(this.getY() - pixel)
};

Entite.prototype.existeCollisionFrameDroite = function(){
    return this.getX() < FRAME_SETTINGS.width 
        && this.getX() + this.getLargeur() > FRAME_SETTINGS.width
};

Entite.prototype.estSortiDeLaFrameDroite = function(){
    return this.getX() > FRAME_SETTINGS.width
};

Entite.prototype.existeCollisionFrameGauche = function(){
    return this.getX() < 0 
        && this.getX() + this.getLargeur() > 0
};

Entite.prototype.estSortiDeLaFrameGauche = function(){
    return this.getX() + this.getLargeur() < 0
};


Entite.prototype.estSortiFrame = function(){
    return this.estSortiDeLaFrameDroite() ||
        this.estSortiDeLaFrameGauche()
}

/**
 * Classe héritant de Entite.
 * Va définir le Doodler
 * @param {float} posX en pixel
 * @param {flaot} posY en pixel
 */
var Doodler = function(posX, posY){
    Entite.call(this, posX, posY, 60, 60)

    this.templateId = "doodler"
    this.baseSaut= 0; //coordonnée Y de la base de notre saut
    this.jump = false;

};

Doodler.prototype = Object.create(Entite.prototype);
Doodler.prototype.constructor = Doodler

Doodler.prototype.getTemplateId = function(){return this.templateId}

Doodler.prototype.regarderAGauche = function(){this.regardeADroite = false}
Doodler.prototype.regarderADroite = function(){this.regardeADroite = true}

// isJumping est à vrai tant que le doodler se déplace vers le haut
Doodler.prototype.isJumping = function(){ return this.jump }
Doodler.prototype.setJump = function(newState){ this.jump = newState }
Doodler.prototype.getBaseSaut = function(){ return this.baseSaut }
Doodler.prototype.setBaseSaut = function(newBaseSaut){ this.baseSaut = newBaseSaut }


var Plateforme = function(posX, posY, couleur){
    Entite.call(this, posX, posY, 80, 10)

    this.templateId = "plateforme"
    this.couleur = couleur
}
Plateforme.prototype = Object.create(Entite.prototype);
Plateforme.prototype.constructor = Plateforme