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