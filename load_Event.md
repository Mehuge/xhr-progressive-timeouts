# Syntax #
```
.onload(handler)
.on("load", handler)
.addEventListener("load", handler)
```

# Description #

Fires when readyState of the underlying XMLHttpRequest object reaches level 4.  The handler is passed an [XHRResponse](XHRResponse.md) object which can be used to query the results of the query.

Important Notice: The `onload()` form of registering an on load handler internally calls `start()` to start the request.  This if for convenience in the more simple use cases.

The following two are equivalent:-

```
XHR("/srv").onload(function(resp) { ... });
```
```
XHR("/srv"}.on("load", function(resp) { ... }).start();
```

# Note #

Calling start() after calling onload() is ignored, so can be included for clarity if desired.  Calling onload() before calling post() or query() will produce unexpected behaviour, probably a crash.  always put onload() at the end of the call chain.