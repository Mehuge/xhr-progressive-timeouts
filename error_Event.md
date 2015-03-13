# Syntax #
```
.onerror(handler)
.on("error", handler)
.addEventListener("error", handler)
```

# Description #

Fires whenever an error occurs during the request.  The response object include an error property of type Error that describes the error.

```
XHR("/srv").onerror(function(resp) { 
    var e = resp.error;
    console.log(e.code + ': ' + e.message);
});
```