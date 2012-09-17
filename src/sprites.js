/**
    examples:             
    'sprites_name' : {
         'file' : 'path/to/file',
         'tile' : width,
         'tileh' : height,
         'elements': {
             'sprite_name' : [0, 0]
         }
    },
*/

Sprites = Backbone.Model.extend({
    defaults: {
        images:{
            'sprites' : {
                 'file' : 'web/images/sprites.png',
                 'tile' : 64,
                 'tileh' : 64,
                 'elements': {
                     'heroi' : [0, 0],
                     'nave'  : [1, 0],
                     'tiro'  : [2, 0]
                 },
            },
            'buttons' : {
                 'file' : 'web/images/buttons-sprite.png',
                 'tile' : 300,
                 'tileh' : 45,
                 'elements': {
                     'button' : [0, 0]
                 },
            },
            'explosion' : {
                 'file' : 'web/images/explosion.png',
                 'tile' : 34,
                 'tileh' : 34,
                 'elements': {
                     'explosion' : [0, 0]
                 },
            },
        }
    },
    initialize: function(){
        
    },
    create: function(key){
        if(key != undefined){
            element = this.get('static_images')[key];
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
    		
            element = this.get('images')[key];
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
    		
            return true;
        };

        _.each(this.get('images'), function(element, k){ 
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
        });

    },
    getPaths: function(){
        var array = [], i=0;
        _.each(this.get('images'), function(element, key){ 
            array[i] = element['file']
            i++;
        });

        return array;
    }
});