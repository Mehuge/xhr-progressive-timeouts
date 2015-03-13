# Syntax #
```
.ontimeout(handler)
.on("timeout", handler)
.addEventListener("timeout", handler)
```

# Description #

Fires when the request times out. The handler is passed an [XHRResponse](XHRResponse.md) object which can be used to obtain the query progress.

# Example #

```
XHR("/srv").ontimeout(function(resp) { ... })
```

# Notes #

When a request times out, abort() is called on the underlying XMLHttpRequest object.  When the readyState of the underlying XMLHttpRequest object changes to 4 a timeout event is fired.