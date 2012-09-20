CustomText = BaseEntity.extend({
	defaults: {
        'text' : '',
    },
    initialize: function(params){
    	var model = this;
    	var entity = Crafty.e("2D, DOM, Text");
    	
    	// Se determinados parâmetros não foram especificados, define valores default
    	var _x = ((params['x'] != undefined) ? params['x'] : 0);
    	var _y = ((params['y'] != undefined) ? params['y'] : 0);
    	var _w = ((params['w'] != undefined) ? params['w'] : 100);
		var _h = ((params['h'] != undefined) ? params['h'] : 100);
		var _fontSize = ((params['fontSize'] != undefined) ? params['fontSize'] : '12');
		var _color = ((params['color'] != undefined) ? params['color'] : '#FFF');
		var _textAlign = ((params['textAlign'] != undefined) ? params['textAlign'] : 'left');
		
    	entity
            .attr({w: _w, h: _h, x: _x, y: _y, z: 1001})
            .text(params['text'])
            .css({fontFamily: 'Impact', fontSize: _fontSize+'px', color: _color, lineHeight: _h+'px', textAlign: _textAlign});

    	model.set({'entity' : entity});
    },
    setText: function(params){
    	var model = this;
    	model.get('entity').text(params['text']);
    }
});