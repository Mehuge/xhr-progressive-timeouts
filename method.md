### Syntax ###

```
request.method
```

### Example ###

```
var req = XHR("/srv");
if (username) req.post({ name: username, password: password });
// ...
req.onload(function() {
  if (req.method === "POST") {
     // ... do we really need to know this?
  }
});
```