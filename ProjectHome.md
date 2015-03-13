# Introduction #

The XMLHttpRequest specification provides for a timeout property.  That property is not currently supported in some browsers, and in its simplest form, is merely a timeout for the entire operation.

xhr-progressive-timeouts or xhr-pt.js for short is an API that implements progressive timeouts for better control.  These work by keeping the timeout while data is still flowing, just in the very near future, so long requests can take as long as they need, but if the connection fails the requests will still time out quickly.

This project is a work in progress.  The API maybe subject to change.

[API Documentation](Overview.md)



# Download #

At present, there are no release versions of this code, only the development version:

http://xhr-progressive-timeouts.googlecode.com/hg/trunk/lib/xhr-pt.js

# Browser compatibility #

At this time, I have been developing the API using Chrome and Firefox.  Little or no testing has been done in other browsers as-yet.  This list will be updated as-and-when browsers are tested / supported.  Absence of a browser or version from this list does not necessarily mean xhr-pt wont work in that browser, just that I have not specifically tested it.

| Browser | Version | Status |
|:--------|:--------|:-------|
| Chrome | 24+ | Supported |
| Firefox | 18+ | Supported |
| Internet Explorer | 10+ | Supported|

Tested with AMD loaders:-

| AMD Loader | Version | Status |
|:-----------|:--------|:-------|
| RequireJS | 2.4.1 | Supported |
| dojo | 1.8.0 | Supported |
| curl.js | 0.7.3 | Supported |

Other versions and loaders should also work.


---


# Examples #

## Very simple request ##
Make an XHR GET request and display the response text.
```
XHR("/server/?r=get", function(response) { alert(response.getXhr().responseText); });
```

## Simple request ##
Identical to the previous example.
```
XHR("/server/?r=get").onload(function(response) { alert(response.getXhr().responseText); });
```

## Request with timeout ##
Make the same request but this time with a timeout of 10 seconds.
```
XHR("/server/?r=get").timeout(10000).onload(function(response) { alert(response.getXhr().responseText); });
```

## JSON request ##
Post some data to the server and display the response
```
XHR("/server/?r=update").post(myObject).onload(function(response) { alert(response.getXhr().responseText); });
```

# Other Examples #

## Long format ##
```
function _timeout_handler(response) { /* ... */  };
function _show_progress(response) { /* ... */  };
function _show_error(response) { /* ... */  };
function _show_cancelled(response) { /* ... */  };
function _got_data(response) { /* ... */  };
var xhr = XHR("/server/?r=get"),
xhr.timeout(1000);
xhr.ontimeout(_timeout_handler);
xhr.onprogress(_show_progress);
xhr.onerror(_show_error);
xhr.oncancel(_show_cancelled);
xhr.onload(_got_data);
```

## Single Event Handler ##

```
function response(response) {
  switch(response.eventType) {
  case this.EVENT_TYPE.TIMEOUT:
     // request timed out
     break;
   cae this._EVENT_TYPE.LOAD:
     var data = request.getXhr().response.Text;
     break;
  }
}
XHR("/server/?r=get"),
  .timeout(1000).
  .addEventHandler("timeout", response)
  .addEventHandler("load", response)
  .start();
```

### Real World Example ###

```
var _captcha_session_id;

XHR('captcha.php').onload(function(response) {
  if (response.status == 200) {
    var captcha = JSON.parse(response.getXhr().responseText);
    document.getElementById("captchaimg").src = captcha.url;
   _captcha_session_id = captcha.session_id;
  }
});

// ... some point later ...

XHR('post_comment.asp')
  .query({ action: "add", e: 'ORA-46089', session_id: _captcha_session_id })
  .post({ who: who.value, comment: comment.value, captcha: captcha.value }, 
    "application/x-www-form-urlencoded")
  .onload(function(response) {
    var result = response.getXhr().responseText,
    // ... process the response
  });
```