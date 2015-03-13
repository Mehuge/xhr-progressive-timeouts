# Syntax #
```
query(name, value)
query({ name: value, ... })
```

# Description #

Allows a single name, value pair or an object of keys and values to be supplied to be added to the query parameter list of the request.  Multiple calls to query can be made on a single request and each are applied in turn.

# Notes #

This method takes place of URI encoding the parameters, so raw values should be passed to this method.

# Example(s) #

```
XHR("/srv").query("r", "update");
XHR("/srv").query({ r: "update", id: 123 }).post(data, "application/xml");
```