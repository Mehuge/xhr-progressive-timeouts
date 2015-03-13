# Description #

The object returned by XHR has the following interface:

```
   interface XHRRequest {
       string method;
       string uri;
       string user;
       string password;
       postData;
       XHRRequest timeout(ms);
       XHRRequest debug(on);
       XHRRequest auth(username, password)
       XHRRequest query(name, value);
       XHRRequest query(object);
       XHRRequest header(name, value);
       XHRRequest header(object);
       XHRRequest options();
       XHRRequest head();
       XHRRequest get();
       XHRRequest post(postData, contentType);
       XHRRequest put(postData, contentType);
       XHRRequest addEventListener(event, handler);
       XHRRequest on(event, handler);
       XHRRequest ontimeout(handler);
       XHRRequest onloading(handler);
       XHRRequest onload(handler);
       XHRRequest onerror(handler);
       XHRRequest oncancel(handler);
       XHRRequest cancel();
       XHRRequest start();
       XHRRequest getId();
       XHRRequest addId();
   }
```
> (_interface is not an actual `JavaScript` construct, it is used here simply to document the returned objects properties and methods_)

# See Also #
[XHRResponse](XHRResponse.md) [EVENT\_TYPE](EVENT_TYPE.md)