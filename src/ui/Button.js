
/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/ui/Button.js
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
	 * 
	 * @class Button
	 * @extends jees.UI.ImageSpt
	 * @constructor
	 */
	function Button() {
		this.ImageSpt_constructor();
// public properties:
		/**
    	 * 使用的皮肤，控件对应自己得控件类型
		 * @public
    	 * @override
		 * @property property.skinResource
    	 * @type {String}
    	 * @default "Button"
    	 */
		this.property.skinResource = "Button";
		/**
		 * @public
		 * @property text
		 * @type {String}
		 * @default ""
		 */
		this.text = "";
		/**
		 * @public
		 * @property types
		 * @type {Integer}
		 * @default 4
		 */
		this.types = 4;
		/**
		 * 是否禁用控件
		 * @public
		 * @property disable
		 * @type {Boolean}
		 * @default false
		 */
		this.disable = false;
		/**
		 * @public
		 * @property italic
		 * @type {Boolean}
		 * @default false
		 */
		this.italic = false;
		/**
		 * @public
		 * @property bold
		 * @type {Boolean}
		 * @default false
		 */
		this.bold = false;
		/**
		 * 拆分的字体样式-字体样式
		 * @public
		 * @property fontStyle
		 * @type {String}
		 * @default "Arial"
		 */
		this.fontStyle = "Arial";
		/**
		 * 拆分的字体样式-字体大小
		 * @public
		 * @property fontSize
		 * @type {Integer}
		 * @default 12
		 */
		this.fontSize = 12;
		/**
		 * @public
		 * @property color
		 * @type {String}
		 * @default "#FFFFFF"
		 */
		this.color = "#FFFFFF";
// private properties:
		this._object = new jees.UI.TextBox();
	};
// public static properties:
	var p = createjs.extend( Button, jees.UI.ImageSpt );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		this._init_background();
		this._init_text();
		
		var _this = this;
		if( this.types.indexOf( "push") != -1 ){
			jees.E.bind( this, "mousedown", function( e ){ _this._handle_mousedown( e, _this ); });
        	jees.E.bind( this, "pressup", function( e ){ _this._handle_pressup( e, _this ); });
		}
		
        if( this.types.indexOf( "highlight") != -1 ){
        	jees.E.bind( this, "mouseover", function( e ){ _this._handle_mouseover( e, _this ); });
        	jees.E.bind( this, "mouseout", function( e ){ _this._handle_mouseout( e, _this ); });
        }
		this._reset_disable();
	    this._reset_position();
	}
	/**
	 * 设置状态
	 * @public
	 * @method setDisabled
	 * @param {Boolean} _e
	 */
	p.setDisabled = function( _e ){
		this.disable = _e;
	}
	/**
	 * 是否禁用
	 * @public
	 * @method isDisabled
	 * @return {Boolean}
	 */
	p.isDisabled = function(){
		return this.disable;
	}
// private method: ============================================================
	p._init_background = function(){
		this.state = true;
		
		var size = this.getSize();
		this._skin = new jees.UI.Skin( this.property.skinResource, size.w, size.h, jees.SET.getSkin() );
		
		var data = {
			images: [this._skin.getCacheDataURL("rect"),
				this._skin.getCacheDataURL("highlight"),
				this._skin.getCacheDataURL("push"),
				this._skin.getCacheDataURL("disable")],
			frames: {width: size.w, height: size.h, count: 4 },
	        animations: {
	        	normal: [0, 0, "normal"],
	        	highlight: [1, 1, "highlight"],
	        	push: [2, 2, "push"],
	        	disable: [3, 3, "disable"],
	        }
	   	};
	   	this.spriteSheet = new createjs.SpriteSheet( data );
	   	this.gotoAndPlay( "normal" );
	}
	p._init_text = function(){
		this._object.setText( this.text );
		this._object.setFontSize( this.fontSize );
		this._object.setFontStyle( this.fontStyle );
		this._object.setColor( this.color );
		this._object.setItalic( this.italic );
		this._object.setBold( this.bold );
		this._object.setPosition( this.x + ( this.getSize().w / 2 ) - ( this._object.getSize().w / 2 ) , 
			this.y + ( this.getSize().h / 2 - ( this._object.getSize().h / 2 ) ) );
		// 描述为几态按钮(1-正常 2-高亮 3-按下 4-禁用)
		this.parent.addChild( this._object );
	}
	p._reset_disable = function(){
		if( this.disable ){
			this.gotoAndPlay( "disable" );
		}else{
			this.gotoAndPlay( "normal" );
		}
	}
	 /**
	  * 当按钮按下时，文本控件做字体/10大小的偏移
	  * @private
	  * @method _handle_mousedown
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mousedown = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	var obj = _w._object;
	 	var pos = obj.getPosition();
	 	var offset = obj.getFontSize() / 10;
	 	
	 	this._object.setPosition( pos.x - offset, pos.y - offset );
	 	this.gotoAndPlay( "push" );
	 }
	 /**
	  * 当按钮弹起时，文本控件恢复字体/10大小的偏移
	  * @private
	  * @method _handle_mousedown
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_pressup = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	var obj = _w._object;
	 	var pos = obj.getPosition();
	 	var offset = obj.getFontSize() / 10;
	 	this._object.setPosition( pos.x + offset, pos.y + offset );
	 	this.gotoAndPlay( "normal" );
	 }
	/**
	  * 当按钮移上按钮时
	  * @private
	  * @method _handle_mouseover
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mouseover = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( "highlight" );
	 }
	 /**
	  * 当按钮移上按钮时
	  * @private
	  * @method _handle_mouseout
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mouseout = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( "normal" );
	 }
	 
	jees.UI.Button = createjs.promote( Button, "ImageSpt" );
})();