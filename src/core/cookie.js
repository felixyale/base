define([
  '../core'
], function(base) {
  base.createCookie = function(name, value, days) {
    var expires;

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }

    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) +
    expires + '; domain=' + location.hostname.match(/([a-z0-9\-]+\.[a-z]+$)|([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$)/)[0] +
    '; path=/';
  };

  base.readCookie = function(name) {
    var nameEQ = encodeURIComponent(name) + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }

    return null;
  };

  base.eraseCookie = function(name) {
    base.createCookie(name, '', -1);
  };
});
