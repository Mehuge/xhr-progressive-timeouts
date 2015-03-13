# Syntax #
```
XHR(uri);
XHR(url, function(response) { ... });
XHR(url, [ method, data, username, password ], function(response) { ... });
```

# Description #

The XHR class/function is used to create a basic XHR request object.  It takes one or more arguments, the uri for the request, optionally an array of additional request parameters, and optionally an onload handler.

# Return Value #
I returns an [XHRRequest](XHRRequest.md) object.  This object can be used to further alter and interact with the request.  All methods return this, so that methods can be chained for convenience.

The simplest form of request, a GET request with a load handler is as simple as

```
XHR("/srv?r=verb",function(response){ ... });

XHR("/srv?r=verb").onload(function(response){ ... });
```

POST examples

```
XHR("/srv", [ "POST", postData ], function(response) { ... });

XHR("/srv", [ "POST", postData, user, pass ], function(response) { ... });

XHR("/srv/", [ "POST", postData ]).query("r","verb").addId().onload(function(response) { ... });
```

# See Also #

[onload](load_Event.md), [addEventListener](addEventListener.md)