Crafty.c("MovieClip", {
	_buttonMode: false,
	dropTarget: null,
	hitArea: null,
	init: function () {
		var entity = this;
		
		this.requires("SpriteAnimation, Multiway, Keyboard, Draggable, Tweener, Collision");
		
		if(Crafty.support.setter) {
	      this._mc_defineGetterSetter_setter();
		} else if (Crafty.support.defineProperty) {
			//IE9 supports Object.defineProperty
	    	this._mc_defineGetterSetter_defineProperty();
		} else {
			/*
			Fallback for browsers where setters and getters are not supported
			*/
	    	this._mc_defineGetterSetter_fallback();
		}
	},
	_mc_defineGetterSetter_setter: function() {
		this.__defineSetter__('buttonMode', function (v) { 
			this._attr('_buttonMode', v);
			if(this._buttonMode) {
				this.addComponent("MouseHover");
			} else {
				this.removeComponent("MouseHover");
			}
		});
		
		this.__defineGetter__('buttonMode', function () { return this._buttonMode; });
	},
	_mc_defineGetterSetter_defineProperty: function() {
		Object.defineProperty(this, 'buttonMode', 
			{ 
				set: function (v) { 
					this._attr('_buttonMode', v);
					if(this._buttonMode) {
						this.addComponent("MouseHover");
					} else {
						this.removeComponent("MouseHover");
					} 
				}, 
				get: function () { return this._buttonMode; },
				configurable: true
			});
	},
	_mc_defineGetterSetter_fallback: function() {
		this.buttonMode = this._buttonMode;
		
		if(this._buttonMode) {
			this.addComponent("MouseHover");
		} else {
			this.removeComponent("MouseHover");
		}
	},
	gotoAndPlay: function(frame) {
		//TODO
	},
	gotoAndStop: function(frame) {
		//TODO
	},
	play: function() {
		//TODO
	},
	stop: function() {
		//TODO
	},
	/*startDrag: function(lockCenter, bounds) {
		var _lockCenter = lockCenter || false,
			_bounds = bounds || null;
			
		//TODO
	},
	stopDrag: function() {
		this.stopDrag();
		//TODO
	}*/
});