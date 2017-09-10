/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/UI/Widget.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jeesjs = this.jeesjs || {};

(function() {
	"use strict";
// constructor:
	/**
	 * @class Widget
	 * @extends createjs.Container
	 * @param {Widget} _p
	 * @constructor
	 */
    function Widget( _p ){
// private properties: 
    	this._x = 0;
    	this._y = 0;
    	/**
    	 * 控件宽度
    	 * @property _width
    	 * @type {Number}
    	 * @default 0
    	 */
    	this._width = 0;
    	/**
    	 * 控件高度
    	 * @property _height
    	 * @type {Number}
    	 * @default 0
    	 */
    	this._height = 0;
    	/**
    	 * 控件状态
    	 * @property _enabled
    	 * @type {Boolean}
    	 * @default true
    	 */
    	this._enabled = true;
    	/**
    	 * 控件状态是否选中，部分有效
    	 * @property _checked
    	 * @type {Boolean}
    	 */
    	this._checked = false;
    	 /**
    	 * 控件状态是否可见
    	 * @property _visible
    	 * @type {Boolean}
    	 */
    	this._visible = true;
    	/**
    	 * 控件透明度
    	 * @property _alpha
    	 * @type {Float} 0~1
    	 */
    	this._alpha = 1;
    	/**
    	 * 事件的方法池
    	 * @property _event_map
    	 * @type {Map}
    	 */
    	this._event_map = {};
    	/**
    	 * 事件绑定的方法池
    	 * @property _handle_map
    	 * @type {Map}
    	 */
    	this._handle_map = {};
		/**
    	 * CreateJS绘制容器
    	 * @property _container
    	 * @type {createjs.Container}
    	 * @default null
    	 */
    	this._container = null;
    	/**
    	 * CreateJs绘制对象
    	 * @property _object
    	 * @type {createjs.DisplayObject}
    	 * @default null
    	 */
    	this._object = null;
    	/**
    	 * 父控件
    	 * @property _container
    	 * @type {createjs.Container}
    	 * @default null
    	 */
    	this._parent = _p ? _p : null;
// public properties:
    };
	
    var p = Widget.prototype;
// public method
    /**
     * 返回根容器或者根对象，如果是容器则返回容器
     * @method getObject
     * @return {createjs.Container|createjs.DisplayObject}
     */
    p.getObject = function(){
    	return this._container ? this._container : this._object;
    }
    /**
     * 添加子控件
     * @method addChild
     * @param {createjs.DisplayObject}
     */
    p.addChild = function( _d ){
    	if( this.isContainer() )
    		this._container.addChild( _d );
    	else throw "根节点为非容器类型控件。";
    }
    /**
     * 是否是容器形式的控件
     * @method isContainer
     * @return {Boolean}
     */
    p.isContainer = function(){
    	return this._container != null;
    }
    /**
	 * 获取控件宽高
	 * @method getSize
	 * @return {w,h}
	 */
	p.getSize = function(){
		return { w: this._width, h: this._height };
	};
    /**
     * 设置宽高
     * @method setSize
     * @param {Number} _w
     * @param {Number} _h
     */
    p.setSize = function( _w, _h ){
    	this._width = _w;
    	this._height = _h;
    	
    	if( this.isContainer() )
    		this._container.setBounds( this._x, this._y, this._width, this._height );
    };
    /**
	 * 获取控件坐标
	 * @method getPosition
	 * @return {x,y}
	 */
	p.getPosition = function(){
		return { x: this._x, y: this._y };
	}
    /**
     * 设置坐标
     * @method setPosition
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
    	this._x = _x;
    	this._y = _y;
    	if( this.isContainer() )
    		this._container.setBounds( this._x, this._y, this._width, this._height );
	};
	/**
	 * 获取控件状态
	 * @method isEnabled
	 * @return {Boolean}
	 */
	p.isEnabled = function(){
		return this._enabled;
	};
	/**
	 * 设置控件状态，主要用于屏蔽事件穿透
	 * @method setEnabled
     * @param {Boolean} _e
	 */
	p.setEnabled = function( _e ){
		this._enabled = _e;
	}
	/**
	 * 获取控件状态
	 * @method isChecked
	 * @return {Boolean}
	 */
	p.isChecked = function(){
		return this._checked;
	};
	/**
	 * 设置控件状态，主要用于屏蔽事件穿透
	 * @method setChecked
     * @param {Boolean} _c
	 */
	p.setChecked = function( _c ){
		this._checked = _c;
	}
	/**
	 * 获取控件透明度
	 * @method getAlpha
	 * @return {Float} [0, 1]
	 */
	p.getAlpha = function(){
		return this._alpha;
	};
	/**
	 * 设置控件透明度
	 * @method setAlpha
	 * @param {Float} [0, 1]
	 */
	p.setAlpha = function( _a ){
		this._alpha = _a;
	};
	/**
	 * 控件是否可见
	 * @method isVisible
	 * @param {Boolean}
	 */
	p.isVisible = function(){
		return this._visible;
	};
	/**
	 * 设置控件是否可见
	 * @method setVisible
	 * @param {Boolean} _v
	 */
	p.setVisible = function( _v ){
		this._visible = _v;
	};
// event method
    /**
     * 自定义绑定事件
     * @method onEvent
     * @param {String} _e 事件比如："click"等。具体参考CreateJs官网各控件对应事件类型。
     * @param {Function( createjs.Event, jeesjs.Widget )} _f( _e, _w ) _e为对应的事件信息，_w为触发事件的控件Widget
     */
    p.onEvent = function( _e, _f ){
    	if( typeof _f != "function" ) throw "参数_f不是有效的方法类型";
    	// 事件始终绑定到DisplayObejct对象上
    	if( this._object )
    		this._bind_event( _e, this._object, _f );
    }
    /**
     * 解绑控件弹起事件
     * @method unEvent
     */
    p.unEvent = function( _e ){
    	if( this._object )
    		this._unbind_event( _e, this._object );
    };
// private method
    /**
     * 用于子控件初始化结束后调用，保证子控件管理器绘制父控件之前加入。 
     * @method _init_finish
     * @param {Widget} _p
     */
    p._init_finish = function(){
    	if( this._parent != undefined ){
    		this._parent.addChild( this.getObject() );
    	}
    };
    /**
     * 这里参考的写法，主要用于控件禁用状态同时禁用事件。
     * @method _bind_event
	 * @param {String} _e
	 * @param {Widget} _w
	 * @param {Function} _f
	 * @private
	 * 参考：http://www.ajexoop.com/wordpress/2016/03/新手写createjs时容易遇到的坑（持续更新）.html
     */
	p._bind_event = function( _e, _w, _f ){
		this._handle_map[ _e ] = _f;
		var _this = this;
		this._event_map[ _e ] = _w.addEventListener( _e, function( e ) { _this._handle_event( e ); } );
	};
	/**
	 * @method _unbind_event
	 * @param {String} _e
	 * @param {Widget} _w
	 * @private
	 */
	p._unbind_event = function( _e, _w ){
		_w.removeEventListener( _e, this._event_map[_e] );
		this._event_map[ _e ] = null;
		this._handle_map[ _e ] = null;
		delete this._event_map[ _e ];
		delete this._handle_map[ _e ];
	};
	/**
	 * @method _handle_event
	 * @param {createjs.Event} _e
	 * @private
	 */
    p._handle_event = function( _e ){
    	if( this.isEnabled() ) this._handle_map[ _e.type ] ( _e, this );
    };
    
	jeesjs.Widget = Widget;
})();