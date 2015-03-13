# Syntax #
```
.addEventListener(name, handler)
.on(name, handler)
```

# Description #

When an event fires that matches the name, handler is called, and is pass an [XHRResponse](XHRResponse.md) object which can be used to obtain the results of the query.

# Example(s) #

```
XHR("/srv").addEventListener("load",function(response) { ... }).start();
```

# Events #

[timeout](timeout_Event.md) [loading](loading_Event.md) [load](load_Event.md) [error](error_Event.md) [cancel](cancel_Event.md)

# Notes #

`on()` is an alias for `addEventListener()`, they are functionally the same.