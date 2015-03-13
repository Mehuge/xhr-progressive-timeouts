# Syntax #
```
.start()
```

# Description #

Starts the request, if it has not already been started.  When .[onload](load_Event.md)() method is called, .start() is implied.

# Example(s) #

```
XHR("/srv").addEventListener("load",function(response) { ... }).start();
```

# Events #

[timeout](timeout_Event.md) [loading](loading_Event.md) [load](load_Event.md) [error](error_Event.md) [cancel](cancel_Event.md)

# Notes #

`on()` is an alias for `addEventListener()`, they are functionally the same.