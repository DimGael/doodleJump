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
