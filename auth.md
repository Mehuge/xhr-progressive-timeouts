# Syntax #
```
auth(username, password)
```

# Description #

Sets HTTP authentication username and password to use for the request.

# Example #
```
XHR("/srv?r=auth").auth("userid", "secret").onload(function(response){ ... });
```