# Syntax #
```
.onheaders(handler)
.on("headers", handler)
.addEventListener("headers", handler)
```

# Description #

Fires when `readyState` of the underlying `XMLHttpRequest` object reaches level 2 (HEADERS\_RECEIVED).

The handler is passed an [XHRResponse](XHRResponse.md) object which can be used to obtain the response headers.

# Example #

```
XHR("/srv").onheaders(function(resp) { ... })
```

# See Also #

http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-readystate