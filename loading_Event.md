# Syntax #
```
.onloading(handler)
.on("loading", handler)
.addEventListener("loading", handler)
```

# Description #

Fires when `readyState` of the underlying `XMLHttpRequest` object reaches level 3 (LOADING).

The handler is passed an [XHRResponse](XHRResponse.md) object which can be used to obtain the query progress.

# Example #

```
XHR("/srv").onloading(function(resp) { ... })
```

# See Also #

http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-readystate