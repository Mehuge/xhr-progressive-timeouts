# Syntax #
```
.addId()
```

# Description #

Adds the ID assigned to this request as a query string in the form id=N where N is the integer ID.

# Example(s) #

```
XHR("/srv").addId().onload(function(response) { /* handle response */ });
```

Equivalent to

```
var req = XHR("/srv");
req.query("id", req.getId()).onload(function(response) { /* handle response */ });
```

# See Also #

[getId](getId.md)