(function () {
  var list, s, w, _usci, _usf, _usc;
  if (!usObject) return;

  // usObject.list が指定されていればそれを使う
  // usObject.list が指定されていなければ、usObject を使う（従来どおりの動作）
  list = usObject.list || [usObject];

  _usci = usgetCookie('usonarid');
  _usf = "";
  if (!_usci) {
    _usci = "CID" + new Date().getTime() + String(Math.random()).substr(2, 4);
    _usf = "1";
  }

  w = new Date();
  w.setFullYear(w.getFullYear() + 1);
  ussetCookie("usonarid", _usci, w, "/");
  
  _usc = (document.cookie) ? true : false;

  list.forEach(function(usObjectPart) {
    var usObjectClone, scriptTag, firstScriptTag;
    usObjectClone = {
      _usci: _usci,
      _usf: _usf,
      _usc: _usc,
      path: usObjectPart.path || usObject.path,
      gid: usObjectPart.gid || usObject.gid,
      uid: usObjectPart.uid || usObject.uid,
      pw: usObjectPart.pw || usObject.pw,
      _usv: usObjectPart._usv || usObject._usv,
      callback: usObjectPart.callback || usObject.callback,
    };

    s = usObjectClone.path + "alog.php";
    s += "?gid=" + usObjectClone.gid + "&uid=" + usObjectClone.uid + "&pw=" + usObjectClone.pw;
    s += "&ourl=" + encodeURIComponent(location.href) + "&ref=" + encodeURIComponent(document.referrer) + "&title=" + encodeURIComponent(document.title);
    s += "&_usc=" + usObjectClone._usc + "&_usv=" + usObjectClone._usv + "&_usci=" + usObjectClone._usci + "&_usf=" + usObjectClone._usf;
    s += (usObjectClone.callback ? "&callback=" + encodeURIComponent(usObjectClone.callback) : "");

    scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.src = s;
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
  });
})();


function ussetCookie(name, value, expires, path, theDomain, secure) {
  value = escape(value);
  var theCookie = name + "=" + value +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((theDomain) ? "; domain=" + theDomain : "") +
    ((secure) ? "; secure" : "");
  document.cookie = theCookie;
}

function usgetCookie(Name) {
  var search = Name + "="
  if (document.cookie.length > 0) { // if there are any cookies
    var offset = document.cookie.indexOf(search)
    if (offset != -1) { // if cookie exists
      offset += search.length
      // set index of beginning of value
      var end = document.cookie.indexOf(";", offset)
      // set index of end of cookie value
      if (end == -1) end = document.cookie.length
      return unescape(document.cookie.substring(offset, end))
    }
  }
}
function usdelCookie(name, path, domain) {
  if (usgetCookie(name)) document.cookie = name + "=" +
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "") +
    ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}


var sending = false;
var xhr;
////************************************************
// ie6-8対応　コールバック用bind有効化
//************************************************
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () { },
      fBound = function () {
        return fToBind.apply(this instanceof fNOP
          ? this
          : oThis || window,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

//TODO 下記すべて不要

/****************************************************************
* XMLHttpRequestの作成(ajax_send_sync,ajax_send_asyncとセット)
*
* 引数 ： -
* 戻値 ： XMLHttpRequestオブジェクト or false
* 使方 ： var xhr = createXmlHttp();
*
****************************************************************/
function createXmlHttp() {
  xhr = false;

  if (window.XDomainRequest) {
    // IE8対応
    xhr = new XDomainRequest();
    // IE8フラグ
    xhr.domainRequest = true;
  } else if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    // IE対応
    // さもなくばActiveXオブジェクトを利用
    try {
      xhr = new ActiveXObject('MSXML2.XMLHTTP.6.0');
    } catch (e) {
      try {
        xhr = new ActiveXObject('MSXML2.XMLHTTP.3.0');
      } catch (e) {
        try {
          xhr = new ActiveXObject('MSXML2.XMLHTTP');
        } catch (e) {
        }
      }
    }
  }
  return xhr;
}

/****************************************************************
* XMLHttpRequestの送信(同期)
*
* ※同期・非同期で挙動が違うので分ける
*
* 引数 ： url リクエスト先
*         params パラメータ(例："name=ponpon&body=test")
* 戻値 ： XMLHttpRequestオブジェクト or false
* 使方 ： ajax_send_sync(url, "name=ponpon&body=test");
*
****************************************************************/
function ajax_send_sync(url, params) {
  if (sending === true) { return; }

  sending = true;
  try {
    xhr = createXmlHttp();
    xhr.open('POST', url, false);
    if (xhr.domainRequest !== true) {
      // IE8(XDomainRequest用)
      //xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Content-Type", "text/plain"); // 多分ここが重要「text/plain」でないと引数を持っていかない。

      // キャッシュ無効
      //xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
    }
    xhr.send(params);

    if (xhr.readyState == 4 && xhr.status == 200) {
      sending = false;
      return xhr;
    }
  } catch (e) {
    sending = false;
  }
  sending = false;
  return false;
}

/****************************************************************
* XMLHttpRequestの送信(非同期)
*
* ※同期・非同期で挙動が違うので分ける
*
* 引数 ： url リクエスト先
*         params パラメータ(例："name=ponpon&body=test")
*         callback コールバック関数
* 戻値 ： -
* 使方 ： ajax_send_async(url, "name=ponpon&body=test", func);
*
****************************************************************/
function ajax_send_async(url, params, callback) {
  if (sending === true) { return; }
  sending = true;
  try {
    var xhr = createXmlHttp();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          sending = false;
          if (callback) { callback(xhr); }
        } else {
          sending = false;
          if (callback) { callback(false); }
        }
      }
    }

    xhr.open('POST', url, true);
    if (xhr.domainRequest !== true) {
      // IE8(XDomainRequest用)
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      // キャッシュ無効
      xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
    }
    xhr.send(params);
  } catch (e) {
    sending = false;
    // alert(e)
    //alert ('ただいま混み合っております')
  }
  sending = false;
}
