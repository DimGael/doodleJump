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
Doodler.prototype = Object.create(Entite.prototype);

Doodler.prototype.getTemplateId = function(){return this.templateId}
