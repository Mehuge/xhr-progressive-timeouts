# Syntax #

```
response.XHR
```

# Description #
A reference back to the originating XHR object (exposing the [XHRRequest](XHRRequest.md) interface)

# Example #

```
XHR("/srv").onload(function(response) {
   if (response.XHR.method == "GET") { ... }
});
```