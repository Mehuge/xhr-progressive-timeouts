# Syntax #
```
.getId()
```

# Description #

Returns an integer request ID assigned to this request.  Each request is given a unique (within the context of this webpage) ID when it is first created.  This can be retrieved using getId().

# Example(s) #

```
var req = XHR("/srv");
req.getId();
req.onload(function(response) { /* handle response */ });
```