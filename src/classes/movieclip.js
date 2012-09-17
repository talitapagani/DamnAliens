MovieClip = BaseModel.extend({
	defaults: {
       
    },
    initialize: function(sprite){
    	var _sprite = this.serialize(sprite) || "",
    		mc = Crafty.e("2D,"+gameContainer.conf.get('renderType')+", MovieClip, "+_sprite);
    		
    	this.attribute('x', function() { return this.getEntity().x; }, function(val) { this.getEntity().x = val; });
    	this.attribute('y', function() { return this.getEntity().y; }, function(val) { this.getEntity().y = val; });
    	this.attribute('z', function() { return this.getEntity().z; }, function(val) { this.getEntity().z = val; });
    	this.attribute('width', function() { return this.getEntity().w; }, function(val) { this.getEntity().w = val; });
    	this.attribute('height', function() { return this.getEntity().h; }, function(val) { this.getEntity().h = val; });
    	this.attribute('rotation', function() { return this.getEntity().rotation; }, function(val) { this.getEntity().rotation = val; });
    	this.attribute('alpha', function() { return this.getEntity().alpha; }, function(val) { this.getEntity().alpha = val; });
    	this.attribute('visible', function() { return this.getEntity().visible; }, function(val) { this.getEntity().visible = val; });
    	this.attribute('buttonMode', function() { return this.getEntity().buttonMode; }, function(val) { this.getEntity().buttonMode = val; });
    	this.attribute('draggable', function() { return this.getEntity().draggable; }, function(val) { this.getEntity().draggable = val; });
    	
    	this.attribute('entity', function() { return this.getEntity(); }, function(val) { this.set({'entity' : val}); });
    	

    	this.set({'entity' : mc });
    },
});