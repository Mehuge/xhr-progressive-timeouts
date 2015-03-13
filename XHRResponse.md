# Description #

The object returned by XHR has to the following interface.

```
   interface XHRResponse {
       EVENT_TYPE: { LOADING: 0, TIMEOUT: 1, CANCEL: 2, ERROR: 3, LOAD: 4 };
       XHRRequest XHR;
       XMLHttpRequest getXhr();
       EVENT_TYPE eventType;
       string eventName;
   }
```
> (_interface is not an actual `JavaScript` construct, it is used here simply to document the returned objects properties and methods_)

The event type indicates the type of event being fired.  Note that an onload event will fire even when the server returned an error, it is up to the handler to check the HTML status to determine if the request was a success or not.

The XHR property is a reference back to the original request.

The EVENT\_TYPE enum lists the possible types of events that may be triggered.

# See Also #
[XHRRequest](XHRRequest.md) [EVENT\_TYPE](EVENT_TYPE.md)