## The Problem ##

When making XHR requests over a slow connection for different amounts of data, having a single timeout does not make sense, because it would need to be large enough for the slowest acceptable request time.

But how long is acceptable? For a very large amount of data, a long timeout is acceptable, but for a small amount of data a long timeout is not acceptable.

If we knew the size of the data up front we could make a better guess at how long a timeout we should use, but we don't always know up front how big the response is going to be, so we just have to make the timeout stupidly large to cater for worst case scenario.

This can be undesirable, especially if the connection has in fact failed, because it means we have to wait a very long time before we can try again. It gives a very poor user experience over unreliable connections.

## The Solution ##

The API presented here attempts to solve this problem by using progressive timeouts.

The basic concept is that, whilst we are receiving data, then we are happy, if we stop receiving data, we want to know about it very quickly. To achieve this, the idea is to keep the timeout a set number of seconds ahead of the current request duration.

Lets say that during a download, if we dont receive data for 20 seconds, we want to abort the connection and retry. The idea is to keep the timeout set 20 seconds ahead of the time taken so far, then if the connection stalls, we can respond to it quickly (within 20 seconds) but if its just being slow and taking ages, the download merrily keeps on chugging away.

```
XHR("/api/action").onload(function(resp){ /* got response */ });
```

```
XHR("/api/get/users")
    .timeout(5000).ontimeout(function(resp) { /* handle timeout */})
    .onload(function(resp) { /* got response */});
```