/*
 * Copyright 2013 Austin France
 * 
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
(function(global){
	"use strict";
 	// install as XHR if XHR not already defined.  Do this in an AMD friendly way, that is
	// if global.define exists, we will define xhr-pt as a module in addition to setting
	// global.XHR
	if (!global.XHR) {
		var define = global.define || function(sig, deps, factory) { factory.apply(global); };
		define("xhr-pt", [], function() {
			var _event_names = [ "unsent", "opened", "headers", "loading", "load" ],
				_EVENT_TYPE = { UNSENT: 0, OPENED: 1, HEADERS: 2, LOADING: 3, LOAD: 4, TIMEOUT: 5, CANCEL: 6, ERROR: 7 };
			global.XHR = function(uri, a1, a2, a3) {
				// Private data and methods
				var _id = global.XHR._id++,
					_inflight = false,
					_debug = false,
					_start = 0,
					_timeout = 0,			// timeout timer id
					_headers = {},
					_query = {},
		
					// Public method implementations
		
					timeout = function(timeouts) {
						if (typeof(timeouts) != "array") timeouts = [ timeouts ];
						if (timeouts.length > 0) {
							while (timeouts.length < 4) timeouts.push(timeouts[0]);
							_timeouts = timeouts;
						}
						return this;
					},

					auth = function(user, password) {
						this.user = user;
						this.password = password;
						return this;
					},

					_mixin = function(hash,o,v) {
						if (typeof o == "string") {
							hash[o] = v;
						} else {
							for (k in o) { hash[k] = o[k]; }
						}
					},

					query = function(name, value) {
						_mixin(_query, name, value);
						return this;
					},

					header = function(name, value) {
						_mixin(_headers, name, value);
						return this;
					},
		
					get = function() {
						this.method = "GET";
						return this;
					},
		
					head = function() {
						this.method = "HEAD";
						return this;
					},
		
					options = function() {
						this.method = "OPTIONS";
						return this;
					},
		
					post = function(data, contentType) {
						this.method = "POST";
						_requestBody.apply(this, [ data, contentType ]);
						return this;
					},
					
					put = function(data, contentType) {
						this.method = "PUT";
						_requestBody.apply(this, [ data, contentType ]);
						return this;
					},
		
					ontimeout = function(handler) { this.on("timeout", handler); return this; },
					onopened = function(handler) { this.on("opened", handler); return this; },
					onheaders = function(handler) { this.on("headers", handler); return this; },
					onloading = function(handler) { this.on("loading", handler); return this; },
					onload = function(handler) { this.on("load", handler); this.start(); return this; },
					onerror = function(handler) { this.on("error", handler); return this; },
					oncancel = function(handler) { this.on("cancel", handler); return this; },
		
					on = function(name, handler) {
						var listeners = _listeners[name] || [];
						listeners.push(handler);
						_listeners[name] = listeners;
						return this;
					},
		
					debug = function(on) {
						_debug = on;
						return this;
					},
		
					cancel = function() {
						this.cancelled = true;
						if (_inflight) _xhr.abort();
					},

					start = function() {
						if (!_inflight) {
							_inflight = true;
							var XHR = this;
							_start = (new Date()).valueOf();
							_timeout = setTimeout(function() { _timedout.apply(XHR) }, _timeouts[0]);
							_xhr.onreadystatechange = function() { _readystatechange.apply(XHR); };
							var uri = this.uri, sep = uri.indexOf("?") == -1 ? "?" : "&";
							for (name in _query) {
								uri += sep + name + "=" + encodeURI(_query[name]);
								sep = "&";
							}
							_xhr.open(this.method, uri, true, this.user, this.password);
							for (name in _headers) {
								console.debug(_id + ": SET HEADER " + name + ": " + _headers[name]);
								_xhr.setRequestHeader(name, _headers[name]);
							}
							if (_debug) {
								console.debug(_id + ": XHR " + this.method + " " + uri);
							}
							try {
								if (this.contentType) {
									_xhr.setRequestHeader("Content-Type", this.contentType);
								}
								_xhr.send(this.postData);
							} catch(e) {
								clearTimeout(_timeout);
								_timeout = null;
								_fireEvent(XHR, "error", _getResponse(this, { error: e }));
							}
						}
						return this;
					},
		
					getId = function() {
						return _id;
					},
		
					addId = function() {
						_query.id = _id;
						return this;
					},
		
					_requestBody = function(data, contentType) {
						if (typeof(data) == "object") {
							if (!contentType) contentType = "application/json";
							switch (contentType) {
							case "text/plain":
								this.postData = data.toString();
								this.contentType = contentType;
								break;
							case "application/json": 
								this.postData = JSON.stringify(data);
								this.contentType = "application/json";
								break;
							default:
								throw new Error("request body of type object with unsupported content type");
								break;
							}
						} else {
							this.postData = data;
							this.contentType = contentType || "application/x-www-form-urlencoded";
						}
					},
		
					_timedout = function() {
						this.timedout = true;
						this.cancel();
					},
		
					_readystatechange = function() {
						var sofar = (new Date()).valueOf() - _start, XHR = this;
						if (_timeout) {
							clearTimeout(_timeout);
							_timeout = null;
						}
						if (_xhr.readyState < 4) {
							if (_debug) {
								console.debug(_id + ": XHR READY STATE " + _xhr.readyState 
									+ " TAKEN " + sofar 
									+ " TIMEOUT " + (sofar + _timeouts[_xhr.readyState])); 
							}
							_timeout = setTimeout(function() { _timedout.apply(XHR) }, _timeouts[_xhr.readyState]);
							_fireEvent(this, _event_names[_xhr.readyState], _getResponse(this));
						} else {
							_inflight = null;
							if (XHR.timedout) {
								if (_debug) {
									console.debug(_id + ": XHR REQUEST TIMED OUT AFTER " + sofar);
								}
								_fireEvent(this, "timeout", _getResponse(this));
							} else if (XHR.cancelled) {
								if (_debug) {
									console.debug(_id + ": XHR CANCELLED AFTER " + sofar);
								}
								_fireEvent(this, "cancel", _getResponse(this));
							} else {
								if (_debug) {
									console.debug(_id + ": XHR COMPLETE STATUS " + _xhr.status + " TOOK " + sofar);
								}
								if (_xhr.status == 0) {
									var e = new Error('something went wrong during the transfer');
									e.code = 0;
									_fireEvent(this, "error", _getResponse(this, { error: e }));
								} else {
									_fireEvent(this, "load", _getResponse(this, { status: _xhr.status }));
								}
							}
						}
					},
		
					_fireEvent = function(XHR, name, args) {
						args.eventName = name;
						args.eventType = _EVENT_TYPE[name.toUpperCase()];
						if (_debug) {
							console.debug(_id + ": FIRE EVENT " + name + " -> " + JSON.stringify(args));
						}
						var listeners = _listeners[name] || [];
						for (var i = 0; i < listeners.length; i++) {
							listeners[i].apply(XHR,[ args ]);
						}
					},
		
					_getResponse = function(XHR, response) {
						response = response || {};
						response.XHR = XHR;
						response.EVENT_TYPE = _EVENT_TYPE;
						response.getXhr = function() { return _xhr; };
						return response;
					}, 
		
					_xhr = new XMLHttpRequest(),
		
					_timeouts = [ 20000, 20000, 20000, 20000 ],
		
					_listeners = {},

					exports = {
						// Enums
						EVENT_TYPE: _EVENT_TYPE,
		
						// Public data
						method: "GET",
						uri: uri,
						user: null,
						password: null,
						postData: null,
		
						// Public Methods
						timeout: timeout,
						auth: auth,
						query: query,
						header: header,
						get: get,
						head: head,
						options: options,
						post: post,
						put: put,
						ontimeout: ontimeout,
						onloading: onloading,
						onload: onload,
						onerror: onerror,
						oncancel: oncancel,
						addEventListener: on,
						on: on,
						debug: debug,
						cancel: cancel,
						start: start,
						getId: getId,
						addId: addId
					};

				// parse arguments
				var _fn_onload, a;
				for (var i = 1; i < arguments.length; i++) {
					var arg = arguments[i];
					if (typeof arg == "function") {
						_fn_onload = arg;
					} else if (typeof arg == "object" && "length" in arg) {
						a = arg;
					}
				}

				// if options specified, then process them
				if (a) {
					// [ method, data, user, password ]
					if (a.length) exports.method   = a.shift();
					if (a.length) exports.postData = a.shift();
					if (a.length) exports.user 	   = a.shift();
					if (a.length) exports.password = a.shift();
				}

				// If onload handler specified, then start now
				if (_fn_onload) {
					exports.on("load", _fn_onload);
					exports.start();
				}

				return exports;
			}
			global.XHR._id = 0;
			if (!console.debug) console.debug = console.log;
			return global.XHR;
		});
	}
})(this);
