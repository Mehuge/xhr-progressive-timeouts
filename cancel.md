# Syntax #
```
XHR.cancel()
```

# Description #

Cancels the request by calling abort() on the underlying XMLHttpRequest object.

# Example(s) #

```
var xhr = XHR("/srv").start();
xhr.cancel();
```