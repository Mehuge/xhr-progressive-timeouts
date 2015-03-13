# Syntax #
```
post(data, contentType);
```

# Description #

Sets the request method to POST, and sets the data to send with the body of the request.

If data is of type object, and contentType is application/x-www-form-urlencoded the object properties are converted for form data and posted.  If contentType is text/plain the object is converted to a string by calling object.toString()  and posted, otherwise it is converted to json and sent as application/json content type.

If data is not an object, it is sent as is and content type is set to the specified content type, if no content type is specified it is assumed to be application/x-www-form-urlencoded data.

# Example(s) #

```
XHR("/srv?r=update").post(jsonData, "text/json")
```

```
XHR("/srv?r=update").post({ name: value })
```

```
XHR("/srv?r=update").post({ name: value }, "application/x-www-form-urlencoded")
```

```
XHR("/srv?r=update").post(someobject, "text/plain")
```

```
XHR("/srv?r=update").post("hello", "text/plain")
```

```
XHR("/srv?r=update").post("a=1&b=2")
```

# TODO (Enhancements) #

  * Make it so that if an object is passed, and content type is specified, then content-type is used to determine how the object should be serialised.  Support application/xml, text/xml etc.

  * Allow chaining of post calls (for certain content types only) so that post data can be built on the fly, for example, req.post({name:username}); req.post({password:pass}).