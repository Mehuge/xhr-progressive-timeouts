# Syntax #

```
e.message
```

# Description #
Numerical error code returned by the browser.  A 0 value means that the XHR request was refused / aborted due to cross domain security violation.

# Example #

```
XHR("/srv").onload(function(response) {
   if ("error" in response) {
        var e = response.error;
        console.error(e.code + ': ' + e.message);
   }
});
```