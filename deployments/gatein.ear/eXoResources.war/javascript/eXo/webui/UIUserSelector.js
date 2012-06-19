/**
 * Copyright (C) 2009 eXo Platform SAS.
 * 
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 * 
 * This software is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this software; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA, or see the FSF
 * site: http://www.fsf.org.
 */
eXo.webui.UIUserSelector = {
  /**
   * Init information and event for items table
   * 
   * @param {Object,
   *          String} cont Object or identifier of Object that contains items
   *          table
   */
  init : function(cont) {
    if (typeof (cont) == "string")
      cont = document.getElementById(cont);
    var checkboxes = gj(cont).find("input.checkbox");
    checkboxes.each(function(index)
    {
      if(index == 0)
      {
        checkboxes[index].onclick = eXo.webui.UIUserSelector.checkAll;
      }
      else
      {
        checkboxes[index].onclick = eXo.webui.UIUserSelector.check;
      }
    });
  },
  /**
   * Check or uncheck all items in table
   */
  checkAll : function() {
    eXo.webui.UIUserSelector.checkAllItem(this);
  },
  /**
   * Get all item in table list
   * 
   * @param {Object}
   *          obj first object of table
   */
  getItems : function(obj) {
    return gj(obj).parent().closest("table").find("input.checkbox").get();
  },
  /**
   * Check and uncheck first item
   */
  check : function() {
    eXo.webui.UIUserSelector.checkItem(this);
  },
  /**
   * check and uncheck all items in table
   * 
   * @param {Object}
   *          obj first object of table, if obj.checked is true, check all item.
   *          obj.checked is false, uncheck all items
   */
  checkAllItem : function(obj) {
    var checked = obj.checked;
    var items = eXo.webui.UIUserSelector.getItems(obj);
    var len = items.length;
    for ( var i = 1; i < len; i++) {
      items[i].checked = checked;
    }
  },
  /**
   * Check and uncheck first item, state has dependence on obj state
   * 
   * @param {Object}
   *          obj selected object
   */
  checkItem : function(obj) {
    var checkboxes = eXo.webui.UIUserSelector.getItems(obj);
    var len = checkboxes.length;
    var state = true;
    if (!obj.checked) {
      checkboxes[0].checked = false;
    } else {
      for ( var i = 1; i < len; i++) {
        state = state && checkboxes[i].checked;
      }
      checkboxes[0].checked = state;
    }
  },
  /**
   * Get key code of pressed key
   * 
   * @param {Object}
   *          event event that user presses a key
   */
  getKeynum : function(event) {
    var keynum = false;
    if (window.event) { /* IE */
      keynum = window.event.keyCode;
      event = window.event;
    } else if (event.which) { /* Netscape/Firefox/Opera */
      keynum = event.which;
    }
    if (keynum == 0) {
      keynum = event.keyCode;
    }
    return keynum;
  },

  /**
   * Return true if the key pressed is the Enter. Otherwise return false.
   */
  isEnterPress : function(evt) {
    var _e = evt || window.event;
    var keynum = eXo.webui.UIUserSelector.getKeynum(_e);
    if (keynum == 13) {
      return true;
    }
    return false;
  },

  /**
   * Cancel submit action
   */
  cancelSubmit : function() {
    return false;
  }
}