/**
 * Copyright (C) 2009 eXo Platform SAS.
 * 
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 * 
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */

/**
 *   Array convenience method to clear membership.
 *   @param object element
 *   @returns void
 */
Array.prototype.clear = function () {
  this.length = 0 ;
} ;

/**
 *   Array convenience method to remove element.
 *
 *   @param object element
 *   @returns boolean
 */
Array.prototype.remove = function (element) {
  var result = false ;
  var array = [] ;
  for (var i = 0; i < this.length; i++) {
    if (this[i] == element) {
      result = true ;
    } else {
      array.push(this[i]) ;
    }
  }
  this.clear() ;
  for (var i = 0; i < array.length; i++) {
    this.push(array[i]) ;
  }
  array = null ;
  return result ;
} ;

/**
 *   Array convenience method to check for membership.
 *
 *   @param object element
 *   @returns boolean
 */
Array.prototype.contains = function (element) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == element) {
      return true ;
    }
  }
  return false ;
} ;

Array.prototype.insertAt = function (what, iIndex) {
  if (iIndex < this.length) {
    var aAfter = this.splice(iIndex, 100000, what) ;
    for (var i = 0; i < aAfter.length; i++) {
      this.push(aAfter[i]) ;
    }
  } else {
    this.push(what) ;
  }
} ;

Array.prototype.pushAll = function (array) {
	if (array != null) {
		for (var i = 0; i < array.length; i++) {
			this.push(array[i]) ;
		}
	}
} ;

Array.prototype.each = function (iterator, context) {
	iterator = iterator.bind(context);
  	for (var i = 0; i < this.length; i++) {
		iterator(this[i]) ;
	}
};

/*************************************************************************/
function  HashMap() { 
	 this.properties = new Object() ;
	 this.length =  0 ;
} ;

HashMap.prototype.copyProperties = function(names, object) {
  for (var i = 0; i < names.length; i++) {
    var name = names[i] ;
    this.put(name, object[name]) ;
  }
} ;


HashMap.prototype.setProperties = function(object, clear) {
  for(var name in this.properties) {
    object[name] = this.properties[name] ; 
  }
} ;

HashMap.prototype.get = function (name) {
  return  this.properties[name] ;
} ;

HashMap.prototype.remove = function (name) {
  var value = this.properties[name] ;
  if (value != null)  { 
    this.properties[name] = null ;
    this.length-- ;
    return value ;
  } else {
    return null ;
  }
} ;

HashMap.prototype.put = function (name, value) {
  if (this.properties[name] == null) {
    this.length++ ;
  }
  this.properties[name] =  value ;
} ;

HashMap.prototype.size = function () { return this.length ; } ;

HashMap.prototype.clear = function() {
 this.properties = new Object() ;
 this.length =  0 ;
} ;

/*************************************************************************/
eXo.core.HashMap = HashMap.prototype.constructor ;
/*************************************************************************/

/**
 * @author Nguyen Ba Uoc
 * 
 * String util
 */

String.prototype.trim = function () {
  var tmp = this.replace(/^\s*/, '');
  return tmp.replace(/\s*$/, '');
}


/**
 * @author jeremi joslin
 * 
 * Function util
 */
Function.prototype.bind = function(object) {
  var method = this;
  return function() {
    method.apply(object, arguments);
  }
}

Function.prototype.inherits = function(parentCtor) {
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  this.superClass_ = parentCtor.prototype;
  this.prototype = new tempCtor();
  this.prototype.constructor = this;
};