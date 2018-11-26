/*
 * Author: Aiyoyoyo 
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/ui/ImageBox.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * 支持基本的图片格式。
	 * @class ImageBox
	 * @extends createjs.BitMap
	 * @param {String | Object} _r 参数 "res/demo.jpg"、"resname"、jeesjs.QM.getSource("resname")
	 * @constructor
	 */
	function ImageBox() {
		this.Bitmap_constructor();
	// private properties: ====================================================
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 */
		this.property = new jees.UI.Property();
		/**
		 * 图片是否加载完毕
		 * @public
		 * @property state
		 * @type {Boolean}
		 * @default false;
		 */
		this.state = false;
		/**
		 * 使用的源区域
		 * @public
		 * @property
		 * @type {String}
		 * @default null
		 */
		this.region = null;
	};

	var p = createjs.extend( ImageBox, createjs.Bitmap );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		if( typeof this.property.resource == "string" ){
			if( this.property.resource.startsWith( "data:image" ) ){
				this.image = document.createElement("img");
				this.image.src = this.property.resource;
			}else if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(this.property.resource)){
				this.image = jees.Resource.get( this.property.resource );
			}else{
				this.image = document.createElement("img");
				this.image.src = this.property.resource;
			}
		}else this.image = this.property.resource;
		
		this.state = true;
		if( this.region ){
			var r = this.region.split(",");
			if( r.length != 4 ) throw "分割区域错误:" + r;
			this.setRect( r[0], r[1], r[2], r[3] );
		}else{
			this.setRect( 0, 0, this.image.width, this.image.height );
		}
		
		this._reset_size();
		this._reset_position();
	}
	/**
	 * @public
	 * @method getSize
	 * @returns {Integer,Integer} {w,h}
	 */
	p.getSize = function(){
		return this.property.getSize();
	}
	/**
	 * @public
	 * @method setSize
	 * @param {Integer|String} _w
	 * @param {Integer|String} _h
	 */
	p.setSize = function ( _w, _h ) {
		// 设置记录值
		this.property.setSize( _w, _h );
		this._reset_size();
	};
	/**
	 * 获取控件坐标
	 * @public
	 * @method getPosition
	 * @return {Integer,Integer} {x,y}
	 */
	p.getPosition = function () {
		return { x: this.x, y: this.y };
	}
	/**
     * 设置坐标
     * @method setPosition
     * @extends
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
		this.property.setPosition( _x, _y );
		this._reset_position();
	};
	/**
	 * 获取缩放
	 * @public
	 * @method getScale
	 * @returns {Float,Float} {x,y}
	 */
	p.getScale = function(){
		return {x: this.scaleX, y: this.scaleY};
	}
	/**
	 * 缩放
	 * @public
	 * @method setScale
	 * @param {Integer|Float} _sx
	 * @param {Integer|Float} _sy
	 */
	p.setScale = function( _sx, _sy ){
		this.property.setScale( _sx, _sy );
		this._reset_scale();
	}
	/**
	 * @public
	 * @method getRect
	 * @return {Integer,Integer,Integer,Integer} {x,y,w,h}
	 */
	p.getRect = function(){
		return this.sourceRect;
	}
	/**
	 * 绘制图片的局部
	 * @public
	 * @method setRect
	 * @param {Integer} _x
	 * @param {Integer} _y
	 * @param {Integer} _w
	 * @param {Integer} _h
	 */
	p.setRect = function( _x, _y, _w, _h ){
		this.region = _x + "," + _y + "," + _w + "," + _h;
		this.sourceRect = jees.CJS.newRect( _x, _y, _w, _h );
		this.setBounds( _x, _y, _w, _h);
		this.cache( 0, 0, _w, _h );
	}
	/**
	 * 设置图片热点
	 * @public
	 * @method setReg
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setReg = function( _x, _y ){
		if( _x ) this.regX = _x;
		if( _y ) this.regY = _y;
	}
	/**
	 * @public
	 * @method getReg
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getReg = function(){
		return {x: this.regX, y: this.regY};
	}
 // private method: ===========================================================
	// /**
	//  * @method _onload
	//  * @param {Object|String} _r 
	//  * @private
	//  */
	// p._onload = function( _r ){
	// 	if( typeof _r === "string" && !/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test( _r ) || typeof _r === "object" ){
	// 		this._sourcePath = _r;
	// 		this._onload_finish( this );
    //     }else{
	// 		this._sourcePath = _r;
	// 		var _this = this;
	// 		jeesjs.QM.addSource( _r , _r );
	// 		jeesjs.QM.load( function(){
	// 			_this._onload_finish( _this ) 
	// 		} );
	// 	}
	// }
	// /**
	//  * @method _onload_finish
	//  * @param {Event} _e
	//  * @private
	//  */
	// p._onload_finish = function( _o ){
	// 	_o._source = typeof _o._sourcePath === "object" ? _o._sourcePath : jeesjs.QM.getSource( _o._sourcePath );
	// 	_o._object = new createjs.Bitmap( _o._source );
	// 	_o._reset();
	// }

	/** 
	 * @method _reset_size
	 * @private
	 */
	p._reset_size = function(){
		if( !this.state ) return;
		
		var prop_size = this.property.getSize();
		var bounds = this.getBounds();
		
		if( prop_size.w == 0 ){
			this.property.setSize( bounds.width, prop_size.h );
			prop_size = this.property.getSize();
		}
		if( prop_size.h == 0 ){
			this.property.setSize( prop_size.w, bounds.height );
			prop_size = this.property.getSize();
		}
		
		if( prop_size.w != bounds.width )
			this.property.scaleX = prop_size.w / bounds.width;
		if( prop_size.h != bounds.height )
			this.property.scaleY = prop_size.h / bounds.height;
			
		this._reset_scale();
	}
	/**
	 * 重置坐标
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.property.getPosition();
		var relative_pos = this.parent != null ? this.parent.getSize() : jees.APP.getScreenSize();
		var x = pos.x;
		var y = pos.y;
		
		this.setReg( this.getReg().x, this.getReg().y );
		if( this.property.alignX == 2 ){
			x = relative_pos.w - this.getSize().w - x;
		}else if( this.property.alignX == 1 ){
			this.setReg( this.getSize().w / 2, this.getReg().y );
			x = ( relative_pos.w / 2 ) + x;
		}
		
		if( this.property.alignY == 2 ){
			y = relative_pos.h - this.getSize().h - y;
		}else if( this.property.alignY == 1 ){
			this.setReg( this.getReg().x, this.getSize().h / 2 );
			console.log( this.getReg() );
			y = ( relative_pos.h / 2 ) + y;
		}
		this.x = x;
		this.y = y;
	}
	// /**
	//  * @method _reset_rect
	//  * @private
	//  */
	// p._reset_rect = function(){
	// 	if( !this._state ) return;
	// 	this._object.sourceRect = this._rect;
	// }
	/**
	 * @method _reset_scale
	 * @private
	 */
	p._reset_scale = function(){
		if( !this.state ) return;
		
		this.scaleX = this.property.scaleX;
		this.scaleY = this.property.scaleY;
		
		if( this.region ){
			var b = this.getBounds();
			this.sourceRect = jees.CJS.newRect( 0, 0, b.width, b.height );
		}
	}
    
	jees.UI.ImageBox = createjs.promote( ImageBox, "Bitmap");
})();