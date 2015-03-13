# Syntax #
```
header(name, value)
header({ name: value, ... })
```

# Description #

Allows a single name, value pair or an object of keys and values to be supplied to be added to the headers of the request.  Multiple calls to header can be made on a single request and each are applied in turn.

# Example(s) #

```
XHR("/srv").header("X-Custom-Header", "update").header("X-Another-Header", "hello")
XHR("/srv")
    .header({ "Content-Type": "text/plain", "X-OAuth", authkey })
    .post(data, "application/x-www-form-encoded")
```