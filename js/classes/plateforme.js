var Plateforme = function(posX, posY, couleur){
    Entite.call(this, posX, posY, 80, 10)

    this.templateId = "plateforme"
    this.couleur = couleur
}
Plateforme.prototype = Object.create(Entite.prototype);
Plateforme.prototype.constructor = Plateforme;


var PlateformeStandard = function(posX, posY){
    Plateforme.call(this, posX, posY, 'green')
}
PlateformeStandard.prototype = Object.create(Plateforme.prototype);
PlateformeStandard.prototype.constructor = PlateformeStandard;


var PlateformePiege = function(posX, posY){
    Plateforme.call(this, posX, posY, 'sienna')
}
PlateformePiege.prototype = Object.create(Plateforme.prototype);
PlateformePiege.prototype.constructor = PlateformePiege;


var PlateformeMouvante = function(posX, posY, vitesse, longueurDeplacement){
    Plateforme.call(this, posX, posY, 'blue')
    this.vitesse = vitesse
    this.longueurDeplacement = longueurDeplacement

    this.posXBase = posX
    this.droite = true
}
PlateformeMouvante.prototype = Object.create(Plateforme.prototype);
PlateformeMouvante.prototype.constructor = PlateformeMouvante;

PlateformeMouvante.prototype.getVitesse = function(){ return this.vitesse }
PlateformeMouvante.prototype.setVitesse = function(newVitesse){ this.vitesse = newVitesse }

PlateformeMouvante.prototype.getLongueurDeplacement = function(){ return this.longueurDeplacement }
PlateformeMouvante.prototype.setLongueurDeplacement = function(newLongueurDeplacement){ this.longueurDeplacement = newLongueurDeplacement }

PlateformeMouvante.prototype.getBaseX = function(){ return this.posXBase }
PlateformeMouvante.prototype.vaADroite = function(){ return this.droite }
PlateformeMouvante.prototype.changeDeSens = function(){ this.droite = !this.droite }
