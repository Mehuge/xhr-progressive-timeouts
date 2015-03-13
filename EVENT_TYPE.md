# Syntax #

```
EVENT_TYPE: {  UNSENT: 0, OPENED: 1, HEADERS: 2, LOADING: 3, LOAD: 4, TIMEOUT: 5, CANCEL: 6, ERROR: 7 }
```

# Description #

The [XHRRequest](XHRRequest.md) and [XHRResponse](XHRResponse.md) objects both include the EVENT\_TYPE enum which identify the various types of events that can be fired.  These equate to the following event names:

| ID | ENUM   | Event Name | Registration Method | XHR readyState |
|:---|:-------|:-----------|:--------------------|:---------------|
| 0 | UNSENT  | (N/A)      | (N/A) | UNSENT |
| 1 | OPENED  | "opened"   | [onopened](opened_Event.md) | OPENED |
| 2 | HEADERS | "headers"  | [onheaders](headers_Event.md) | HEADERS\_RECEIVED |
| 3 | LOADING | "loading"  | [onloading](loading_Event.md) | LOADING |
| 4 | LOAD    | "load"     | [onload](load_Event.md) | DONE |
| 5 | TIMEOUT | "timeout"  | [ontimeout](timeout_Event.md) |
| 6 | CANCEL  | "cancel"   | [oncancel](cancel_Event.md) |
| 7 | ERROR   | "error"    | [onerror](error_Event.md) |

The first 5 entries correspond to their equivalent [readyState](http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-readystate) values.

# Example #

```
switch(response.eventType) {
case response.EVENT_TYPE.LOAD:
  // data loaded
  break;
}
```