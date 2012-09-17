CustomText = BaseEntity.extend({
	defaults: {
        'text' : '',
    },
    initialize: function(params){
    	var model = this,
    		entity = Crafty.e("2D, DOM, Text"),
    		// Se determinados parâmetros não foram especificados, define valores default
    		_x = params.x || 0;
    		_y = params.y || 0;
    		_w = params.w || 100;
			_h = params.h || 100;
			_fontSize = params.fontSize || '12';
			_color = params.color || '#FFF';
			_textAlign = params.textAlign || 'left';
		
    	entity
            .attr({w: _w, h: _h, x: _x, y: _y, z: 1001})
            .text(params['text'])
            .css({fontFamily: 'Impact', fontSize: _fontSize+'px', color: _color, lineHeight: _h+'px', textAlign: _textAlign});

    	model.set({'entity' : entity});
    },
    setText: function(params){
    	var model = this;
    	model.get('entity').text(params.text);
    }
});