BaseModel = Backbone.Model.extend({
	defaults: {
        'entity' : null
    },
    initialize: function(){
    
    },
    attribute: function(attr,getter,setter){
    	this.addProperty(this, attr, getter, setter);
    },
    /* 
     * Cross-browser implementation of native JavaScript getter/setter for objects 
 	 * It'll allow to use object.property when creating Backbone's objects, instead of
 	 * using the Backbone object.get('property') of object.set({'property': 'value'})
 	 * 
 	 * Solution source: http://stackoverflow.com/questions/6695503/whats-the-best-way-to-override-model-getattr-in-backbone-js
     */
    addProperty: function (object, label, getter, setter) {
	    if (object.defineProperty){
	      object.defineProperty(object, label, {getter: getter, setter: setter});
	      /* < IE 9 */
	    } else {
	        object.__defineGetter__(label, getter);
	        object.__defineSetter__(label, setter);
	    }
	},
    getEntity: function(){
        return this.get('entity');
    },
    /*
     * As Backbone doesn't accept strings on methods parameters and transforms them on objects,
     * it's needed to serialize de object in order to get the string 
     */
    serialize: function(obj) {
		if (obj == undefined) {
			return undefined;
		} else {
			var str = "";
			for(prop in obj) {
				str += obj[prop].toString();
			}
			return str;
		}
		return;
	},
    remove: function(){
        var entity = this.getEntity();

        if (entity){
            entity.destroy();
        }
    }
});