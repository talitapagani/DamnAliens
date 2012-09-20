Nave = BaseEntity.extend({
	defaults: {
        'speed' : 1,
        'id': 'nave'
    },
    initialize: function(params){
    	var model = this;
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Multiway, nave, Collision");

    	entity
            .attr({x: params['x'], y: params['y'], z: 300})
            .collision(new Crafty.polygon([30,2],[28,4],[27,9],[22,13],[15,14],[13,20],[31,57],[49,20],[47,14],[39,13],[36,9],[34,4],[31,2]))
            .bind('EnterFrame', moveNave)
            
            function moveNave(e) {
            	if(entity.y > 600)
				{
					entity.y = 0;
				}
				else
				{
					entity.y += params['speed'];
				}
            }

            entity.origin(0, 0);

    	model.set({'entity' : entity, 'id': params['id']});
    },
    getID: function() {
    	var model = this;
    	return model.get('id');
    }
});