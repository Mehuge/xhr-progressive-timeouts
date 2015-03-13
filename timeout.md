# Syntax #
```
timeout(ms)
timeout([ ms0, ms1, ms2, ms3 ])
```

# Description #

Sets the timeouts for this request.  The timeout can either be a single millisecond value, in which case, all stages of the request use the same timeout, or an array of 4 timeouts can be specified which are used during each readyState of the underlying XMLHttpRequest object.

| stage | Timeout while waiting for ...|
|:------|:-----------------------------|
| 0 | request to be sent |
| 1 | headers to be received |
| 2 | initial data to be received |
| 3 | more data to be received or requset to complete |

# Example #

```
XHR("/srv/r=verb")
    .timeout(1000)
    .ontimeout(function(response){ alert('timed out'); })
    .onload(function(response){ ... });
```