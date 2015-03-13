# Syntax #
```
.oncancel(handler)
.on("cancel", handler)
.addEventListener("cancel", handler)
```

# Description #

Fires when the request is cancelled. The handler is passed an [XHRResponse](XHRResponse.md) object which can be used to examine the query progress.

# Example #

```
XHR("/srv").oncancel(function(resp) { ... })
```