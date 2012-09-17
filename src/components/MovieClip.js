Crafty.c("MovieClip", {
	_buttonMode: false,
	_draggable: false,
	dropTarget: null,
	hitArea: null,
	init: function () {
		var entity = this;
		
		this.requires("SpriteAnimation, Multiway, Keyboard, Tweener, Collision");
		
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

		entity.origin(entity.w/2, entity.h/2);

		return this;
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
		
		this.__defineSetter__('draggable', function (v) { 
			this._attr('_draggable', v);
			if(this._draggable) {
				this._switchComponent("Collision", "Draggable");
			} else {
				this._switchComponent("Draggable", "Collision")
					.collision();
			}
		});

		this.__defineGetter__('buttonMode', function () { return this._buttonMode; });
		this.__defineGetter__('draggable', function () { return this._draggable; });
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

		Object.defineProperty(this, 'draggable', 
			{
				set: function (v) { 
					this._attr('_draggable', v);
					if(this._draggable) {
						this._switchComponent("Collision", "Draggable");
					} else {
						this._switchComponent("Draggable", "Collision")
							.collision();
					}
				},
				get: function () { return this._draggable; },
				configurable: true
			});
	},
	_mc_defineGetterSetter_fallback: function() {
		this.buttonMode = this._buttonMode;
		this.draggable = this._draggable;
		
		if(this._buttonMode) {
			this.addComponent("MouseHover");
		} else {
			this.removeComponent("MouseHover");
		}
		
		if(this._draggable) {
			this._switchComponent("Collision", "Draggable");
		} else {
			this._switchComponent("Draggable", "Collision")
				.collision();
		}
	},
	_switchComponent: function(comp, switchComp) {
		this.removeComponent(comp);
		this.addComponent(switchComp);
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