# Syntax #

```
response.eventName
```

# Description #

One of the event names that can be passed to the [on](addEventListener.md) method of the XHR object.  See [EVENT\_TYPE](EVENT_TYPE.md) for a list.

# Example #

```
(function() {
  function handler(response) {
    switch(response.eventName) {
    case "error":
       // ...
       break;
    case "load":
       // ...
       break;
    }
  };
  XHR("/srv").onerror(handler).onload(handler);
})();
```

# See Also #

[eventType](eventType.md)