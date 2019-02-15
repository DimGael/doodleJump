var Plateforme = function(posX, posY, couleur){
    Entite.call(this, posX, posY, 80, 10)

    this.templateId = "plateforme"
    this.couleur = couleur
}
Plateforme.prototype = Object.create(Entite.prototype);
Plateforme.prototype.constructor = Plateforme
