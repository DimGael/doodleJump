var Monstre = function(posX, posY){
    Entite.call(this, posX, posY, 80, 10)

    this.templateId = "monstre"
}
Monstre.prototype = Object.create(Entite.prototype);
Monstre.prototype.constructor = Monstre
