# Syntax #
```
.done(onload, onerror, ontimeout)
```

# Description #

The done method registers three handler functions for load, error and timeout events, then calls the .[start](start.md)() method.

# Example(s) #

```
XHR("/srv").done(
    function(response) { console.log('done'); },
    function(response) { console.error(response.error); },
    function(response) { console.log('timeout'); }
);
```

# Events #

[timeout](timeout_Event.md) [load](load_Event.md) [error](error_Event.md)