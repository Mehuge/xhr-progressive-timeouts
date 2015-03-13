# Syntax #

```
response.eventType
```

# Description #

One of the [EVENT\_TYPE](EVENT_TYPE.md) values.

# Example #

```
(function() {
  function handler(response) {
    switch(response.eventType) {
    case response.EVENT_TYPE.ERROR:
       // ...
       break;
    case response.EVENT_TYPE.LOAD:
       // ...
       break;
    }
  };
  XHR("/srv").onerror(handler).onload(handler);
})();
```