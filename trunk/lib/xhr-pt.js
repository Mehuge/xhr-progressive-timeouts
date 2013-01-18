"use strict";
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
function XHR(uri) {

	// Private data and methods
	var _id = (new Date()).valueOf(),
		_inflight = false,
		_debug = false,
		_start = 0,
		_timeout = 0,
		timeout = function(timeouts, ontimeout) {
			if (typeof(timeouts) == "function") {
				ontimeout = timeouts;
			} else {
				if (typeof(timeouts) != "array") timeouts = [ timeouts ];
				if (timeouts.length > 0) {
					while (timeouts.length < 5) timeouts.push(timeouts[0]);
					this.timeouts = timeouts;
				}
			}
			if (ontimeout) this.addEventHandler("timeout", ontimeout);
			return this;
		},
		auth = function(user, password) {
			this.user = user;
			this.password = password;
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

		post = function(data) {
			this.method = "POST";
			this.postData = data;
			return this;
		},

		put = function(data) {
			this.method = "PUT";
			this.postData = data;
			return this;
		},

		ontimeout = function(handler) {
			this.addEventListener("timeout", handler);
			return this;
		},

		onloading = function(handler) {
			this.addEventListener("loading", handler);
			return this;
		},

		onload = function(handler) {
			this.addEventListener("load", handler);
			this.start();
			return this;
		},

		onerror = function(handler) {
			this.addEventListener("error", handler);
			return this;
		},

		oncancel = function(handler) {
			this.addEventListener("cancel", handler);
			return this;
		},

		addEventListener = function(name, handler) {
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
				var XHR = this,
					timeout = function() {
						console.debug(_id + ": XHR REQUEST TIMED OUT");
						_fireEvent.apply(XHR, [ "timeout", _getResponse(XHR.EVENT_TYPE.TIMEOUT) ]);
						XHR.cancel();
					},
					onreadystatechange = function() {
						var sofar = (new Date()).valueOf() - _start;
						clearTimeout(_timeout);
						_timeout = null;
						if (_xhr.readyState < 4) {
							if (_debug) {
								console.debug(_id + ": XHR READY STATE " + _xhr.readyState 
									+ " TAKEN " + sofar 
									+ " TIMEOUT " + (sofar + XHR.timeouts[_xhr.readyState])); 
							}
							_timeout = setTimeout(timeout,XHR.timeouts[_xhr.readyState]);
							_fireEvent.apply(XHR, [ "loading", _getResponse.apply(XHR, [ XHR.EVENT_TYPE.LOADING ]) ]);
						} else {
							delete XHR._inflight;
							if (XHR.cancelled) {
								if (_debug) {
									console.debug(_id + ": XHR CANCELLED AFTER " + sofar);
								}
								_fireEvent.apply(XHR, [ "cancel", _getResponse.apply(XHR, [ XHR.EVENT_TYPE.CANCEL ]) ]);
							} else {
								if (_debug) {
									console.debug(_id + ": XHR COMPLETE STATUS " + _xhr.status + " TOOK " + sofar);
								}
								_fireEvent.apply(XHR, [ "loading", _getResponse.apply(XHR, [ XHR.EVENT_TYPE.LOADING ]) ]);
								if (_xhr.status == 200) {
									_fireEvent.apply(XHR, [ "load", _getResponse.apply(XHR, [ XHR.EVENT_TYPE.LOAD, { status: _xhr.status } ]) ]);
								}
							}
						}
					};
				_start = (new Date()).valueOf();
				_timeout = setTimeout(timeout, this.timeouts[0]);
				_xhr.onreadystatechange = onreadystatechange;
				_xhr.open(this.method, this.uri, true, this.user, this.password);
				if (_debug) {
					console.debug(_id + ": XHR " + this.method + " " + this.uri);
				}
				try {
					_xhr.send(this.postData);
				} catch(e) {
					_fireEvent.appy(XHR, [ "error", _getResponse.apply(XHR [ XHR.EVENT_TYPE.ERROR, { error: e } ]) ]);
				}
			}
			return this;
		},

		getId = function() {
			return _id;
		},

		addId = function() {
			this.uri += (this.uri.indexOf("?") == -1 ? "?" : "&") + "id="+_id;
			return this;
		},

		_fireEvent = function(name, args) {
			var listeners = _listeners[name] || [];
			for (var i = 0; i < listeners.length; i++) {
				listeners[i].apply(this,[ args ]);
			}
		},

		_getResponse = function(eventType, response) {
			response = response || {};
			response.eventType = eventType;
			response.XHR = this;
			response.EVENT_TYPE = this.EVENT_TYPE;
			response.getXhr = function() { return _xhr; };
			return response;
		}, 

		_xhr = new XMLHttpRequest(),

		timeouts = [ 20000, 20000, 20000, 20000, 20000 ],

		_listeners = {},

		exports = {
			// Enums
			EVENT_TYPE: { LOADING: 0, TIMEOUT: 1, CANCEL: 2, ERROR: 3, LOAD: 4 },

			// Public data
			method: "GET",
			uri: uri,
			user: null,
			password: null,
			postData: null,

			// Public Methods
			timeout: timeout,
			auth: auth,
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
			addEventListener: addEventListener,
			debug: debug,
			cancel: cancel,
			start: start,
			getId: getId,
			addId: addId
		};

	return exports;
}
