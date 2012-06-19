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

eXo.webui.UICombobox = {

  init : function(textbox) {
    if (typeof (textbox) == "string")
      textbox = document.getElementById(textbox);
    textbox = gj(textbox).next("input");
    var UICombobox = eXo.webui.UICombobox;
    var onfocus = textbox.attr("onfocus");
    var onclick = textbox.attr("onclick");
    if (!onfocus)
      textbox.on("focus", UICombobox.show);
    if (!onclick)
      textbox.on("click", UICombobox.show);
  },

  show : function(evt) {
    var uiCombo = eXo.webui.UICombobox;
    uiCombo.items = gj(this.parentNode).find("a");
    if (uiCombo.list)
      uiCombo.list.style.display = "none";
    uiCombo.list = gj(this.parentNode).find(".UIComboboxContainer").first()[0];
    uiCombo.list.parentNode.style.position = "absolute";
    uiCombo.fixForIE6(this);
    uiCombo.list.style.display = "block";
    uiCombo.list.style.top = this.offsetHeight + "px";
    uiCombo.list.style.width = this.offsetWidth + "px";
    uiCombo.setSelectedItem(this);
    gj(uiCombo.list).one("mousedown", false);
    gj(document).one("mousedown", uiCombo.hide);
  },

  getSelectedItem : function(textbox) {
    var val = textbox.value;
    var data = eval(textbox.getAttribute("options"));
    var len = data.length;
    for ( var i = 0; i < len; i++) {
      if (val == data[i])
        return i;
    }
    return false;
  },

  setSelectedItem : function(textbox) {
    if (this.lastSelectedItem)
      gj(this.lastSelectedItem).removeClass("UIComboboxSelectedItem");
    var selectedIndex = parseInt(this.getSelectedItem(textbox));
    if (selectedIndex >= 0) {
      gj(this.items[selectedIndex]).addClass("UIComboboxSelectedItem");
      this.lastSelectedItem = this.items[selectedIndex];
      var y = eXo.core.Browser.findPosYInContainer(this.lastSelectedItem,
          this.list);
      this.list.firstChild.scrollTop = y;
      var hidden = gj(textbox).prev("input")[0];
      hidden.value = this.items[selectedIndex].getAttribute("value");

    }
  },

  fixForIE6 : function(obj) {
    if (!eXo.core.Browser.isIE6())
      return;
    if (gj(this.list).children("iframe").length > 0)
      return;
    var iframe = document.createElement("iframe");
    iframe.frameBorder = 0;
    iframe.style.width = obj.offsetWidth + "px";
    this.list.appendChild(iframe);
  },

  cancelBubbe : function(evt) {
    var _e = window.event || evt;
    _e.cancelBubble = true;
  },

  complete : function(obj, evt) {
    if (evt.keyCode == 16) {
      this.setSelectedItem(obj);
      return;
    }
    if (evt.keyCode == 13) {
      this.setSelectedItem(obj);
      this.hide();
      return;
    }
    var sVal = obj.value.toLowerCase();
    if (evt.keyCode == 8)
      sVal = sVal.substring(0, sVal.length - 1)
    if (sVal.length < 1)
      return;
    var data = eval(obj.getAttribute("options").trim());
    var len = data.length;
    var tmp = null;
    for ( var i = 0; i < data.length; i++) {
      tmp = data[i].trim();
      var idx = tmp.toLowerCase().indexOf(sVal, 0);
      if (idx == 0 && tmp.length > sVal.length) {
        obj.value = data[i];
        if (obj.createTextRange) {
          hRange = obj.createTextRange();
          hRange.findText(data[i].substr(sVal.length));
          hRange.select();
        } else {
          obj.setSelectionRange(sVal.length, tmp.length);
        }
        break;
      }
    }
    this.setSelectedItem(obj);
  },

  hide : function() {
    eXo.webui.UICombobox.list.style.display = "none";
  },

  getValue : function(obj) {
    var UICombobox = eXo.webui.UICombobox;
    var val = obj.getAttribute("value");
    var hiddenField = gj(UICombobox.list.parentNode).next("input");
    hiddenField.attr("value", val);
    var text = hiddenField.next("input");
    text.attr("value", gj(obj).find(".UIComboboxLabel").first().html());
    UICombobox.list.style.display = "none";
  }
}

/**
 * Deprecated - use jQuery to register event, then return false instead
 */
eXo.core.EventManager = {
  cancelBubble : function(evt) {
    if (eXo.core.Browser.browserType == 'ie')
      window.event.cancelBubble = true;
    else
      evt.stopPropagation();
  },

  cancelEvent : function(evt) {
    eXo.core.EventManager.cancelBubble(evt);
    if (eXo.core.Browser.browserType == 'ie')
      window.event.returnValue = true;
    else
      evt.preventDefault();
  }
}