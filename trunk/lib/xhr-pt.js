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
	return {
		EVENT_TYPE: { PROGRESS: 0, TIMEOUT: 1, CANCEL: 2, ERROR: 3, READY: 4 },

		_xhr: new XMLHttpRequest(),

		timeouts: [ 20000, 20000, 20000, 20000, 20000 ],

		_listeners: {},

		method: "GET",
		uri: uri,
		user: null,
		password: null,
		postData: null,

		timeout: function(timeouts, ontimeout) {
			if (typeof(timeouts) == "function") {
				ontimeout = timeouts;
			} else {
				if (typeof(timeouts) != "array") timeouts = [ timeouts ];
				if (timeouts.length > 0) {
					while (timeouts.length < 5) timeouts.push(timeouts[0]);
					this.timeouts = timeouts;
				}
			}
			this._ontimeout = ontimeout;
			return this;
		},

		auth: function(user, password) {
			this.user = user;
			this.password = password;
			return this;
		},

		get: function() {
			this.method = "GET";
			return this;
		},

		head: function() {
			this.method = "HEAD";
			return this;
		},

		options: function() {
			this.method = "OPTIONS";
			return this;
		},

		post: function(data) {
			this.method = "POST";
			this.postData = data;
			return this;
		},

		put: function(data) {
			this.method = "PUT";
			this.postData = data;
			return this;
		},

		ontimeout: function(handler) {
			this.addEventListener("timeout", handler);
			return this;
		},

		onprogress: function(handler) {
			this.addEventListener("progress", handler);
			return this;
		},

		onload: function(handler) {
			this.addEventListener("load", handler);
			this.start();
			return this;
		},

		onerror: function(handler) {
			this.addEventListener("error", handler);
			return this;
		},

		oncancel: function(handler) {
			this.addEventListener("cancel", handler);
			return this;
		},

		addEventListener: function(name, handler) {
			var listeners = this._listeners[name] || [];
			listeners.push(handler);
			this._listeners[name] = listeners;
			return this;
		},

		_fireEvent: function(name, args) {
			var listeners = this._listeners[name] || [];
			for (var i = 0; i < listeners.length; i++) {
				listeners[i].apply(this,[ args ]);
			}
		},

		debug: function(on) {
			this._debug = on;
			return this;
		},

		cancel: function() {
			this.cancelled = true;
			if (this._inflight) this._xhr.abort();
		},

		_getResponse: function(eventType, response) {
			response = response || {};
			response.eventType = eventType;
			response.XHR = this;
			response.EVENT_TYPE = this.EVENT_TYPE;
			response.getXhr = function() { return this.XHR._xhr; };
			return response;
		},

		start: function() {
			if (!this._inflight) {
				this._inflight = true;
				var XHR = this,
					_xhr = this._xhr,
					timeout = function() {
						console.debug("XHR REQUEST TIMED OUT");
						XHR._fireEvent("timeout", XHR._getResponse(XHR.EVENT_TYPE.TIMEOUT));
						XHR.cancel();
					},
					onreadystatechange = function() {
						var sofar = (new Date()).valueOf() - XHR._start;
						clearTimeout(XHR._timeout);
						delete XHR._timeout;
						if (_xhr.readyState < 4) {
							if (XHR._debug) {
								console.debug("XHR READY STATE " + _xhr.readyState 
									+ " TAKEN " + sofar 
									+ " TIMEOUT " + (sofar + XHR.timeouts[_xhr.readyState])); 
							}
							XHR._timeout = setTimeout(timeout,XHR.timeouts[_xhr.readyState]);
							XHR._fireEvent("progress", XHR._getResponse(XHR.EVENT_TYPE.PROGRESS));
						} else {
							delete XHR._inflight;
							if (XHR.cancelled) {
								if (XHR._debug) {
									console.debug("XHR CANCELLED AFTER " + sofar);
								}
								XHR._fireEvent("cancel", XHR._getResponse(XHR.EVENT_TYPE.CANCEL));
							} else {
								if (XHR._debug) {
									console.debug("XHR COMPLETE STATUS " + _xhr.status + " TOOK " + sofar);
								}
								XHR._fireEvent("progress", XHR._getResponse(XHR.EVENT_TYPE.PROGRESS));
								if (_xhr.status == 200) {
									XHR._fireEvent("load", XHR._getResponse(XHR.EVENT_TYPE.READY, { status: _xhr.status }));
								}
							}
						}
					};
				this._start = (new Date()).valueOf();
				this._timeout = setTimeout(timeout, this.timeouts[0]);
				_xhr.onreadystatechange = onreadystatechange;
				_xhr.open(this.method, this.uri, true, this.user, this.password);
				if (this._debug) {
					console.debug("XHR " + this.method + " " + this.uri);
				}
				try {
					_xhr.send(this.postData);
				} catch(e) {
					XHR._fireEvent("error", XHR._getResponse(XHR.EVENT_TYPE.ERROR, { error: e }));
				}
			}
			return this;
		}
	}
}
