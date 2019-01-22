var Doodler = function(posX, posY){
    this.posX = posX;
    this.posY = posY;

    this.templateId = "doodler"
};

Doodler.prototype.getX = function(){return this.posX}
Doodler.prototype.getY = function(){return this.posY}
Doodler.prototype.getTemplateId = function(){return this.templateId}

Doodler.prototype.setX = function(newPosX){this.posX = newPosX}
Doodler.prototype.setY = function(newPosY){this.posY = newPosY}
