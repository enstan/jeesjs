/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/Manager/CanvasManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class CanvasManager
	 */
	function CanvasManager() { throw "CanvasManager cannot be instantiated."; };
// public static properties:
	/**
	 * 容器层级类型，默认为DEFAULT
	 * @property Container
	 * @static
	 */
	CanvasManager.Container = {
		BACK : -2,
		BOTTOM : -1,
		DEFAULT: 0,
		TOP : 1,
		POPUP : 2,
		SYSTEM : 3,
		DEBUG : 4,
		CONSOLE : 5,
	};
// private static properties:
	/**
	 * @private
	 * @static
	 * @property _caches
	 * @type {Map}
	 */
	CanvasManager._caches = null;
	
	CanvasManager._containers = null;
// private static methods: ====================================================
	/**
	 * 绘制缓存池内容
	 * @private
	 * @static
	 * @method __update_cache_level
	 * @param {CanvasManager.Container} _c 
	 */
	CanvasManager.__update_cache_level = function( _v ){
		if( this._caches.has( _v ) ){
			var eles = this._caches.get( _v );
			if( eles.length > 0 ){
				var wgt = eles.pop();
				wgt.initialize();
				
				var c = this._containers.get( _v );
				c.addChild( wgt );
			}
		}
	}
	/**
	 * 绘制缓存池内容
	 * @private
	 * @static
	 * @method _update_cache
	 * @param {CanvasManager.Container} _c 
	 */
	CanvasManager._update_cache = function(){
		// 根据层级优先加入绘制
		this.__update_cache_level( CanvasManager.Container.DEFAULT );
	}
// public static methods: =====================================================
	/**
	 * 初始化面板管理器
	 * @public
	 * @static
	 * @method startup
	 **/
	CanvasManager.startup = function() {
		this._caches = new Map();
		this._containers = new Map();
	};
	/**
	 * 刷新画布，并重建画布缓存
	 * @public
	 * @static
	 * @method update
	 */
	CanvasManager.update = function( _c ) {
		this._update_cache();
	};
	/**
	 * 添加一个预加载控件
	 * @public
     * @static
	 * @method addChild
     * @param {createjs.DisplayObject|jeesjs.Widget} _w 添加的控件
     * @param {CanvasManager.Container}
	 */
	CanvasManager.addChild = function( _w, _v ){
		var v = _v || CanvasManager.Container.DEFAULT;
		
		if( this._caches.has( v ) ){
			var eles = this._caches.get( v );
			eles.push( _w );
		}else{
			var eles = new Array();
			eles.push( _w );
			this._caches.set( v, eles );
			
			var c = new jees.CJS.newContainer();
			this._containers.set( v, c );
			jees.APP.addChild( c );
		}
		this._update_cache();
	}
	/**
	 * 添加一个预加载控件
	 * @public
     * @static
	 * @method addChild
     * @param {createjs.DisplayObject|jeesjs.Widget} _w 添加的控件
     * @param {CanvasManager.Container}
	 */
	CanvasManager.removeChild = function( _w, _v ){
		var v = _v || CanvasManager.Container.DEFAULT;
		var c = this._containers.get( v );
		c.removeChild( _w );
	}
	
	jees.CM = CanvasManager;
})();