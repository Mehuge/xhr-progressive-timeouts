# Syntax #
```
.onopened(handler)
.on("opened", handler)
.addEventListener("opened", handler)
```

# Description #

Fires when `readyState` of the underlying `XMLHttpRequest` object reaches level 1 (OPENED).

The handler is passed an [XHRResponse](XHRResponse.md) object which can be used query the request object.

# Example #

```
XHR("/srv").onopened(function(resp) { ... })
```

# See Also #

http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-readystate