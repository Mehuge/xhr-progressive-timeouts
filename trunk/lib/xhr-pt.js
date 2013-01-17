function XHR(uri) {
	return {
		_xhr: new XMLHttpRequest(),

		timeouts: [ 20000, 20000, 20000, 20000, 20000 ],

		method: "GET",
		uri: uri,
		sync: false,
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

		onprogress: function(onprogress) {
			this._onprogress = onprogress;
			return this;
		},

		onload: function(onload) {
			this._onload = onload;
			this.start();
			return this;
		},

		onerror: function(onerror) {
			this._onerror = onerror;
			return this;
		},

		debug: function(on) {
			this._debug = on;
			return this;
		},

		start: function() {
			if (!this._inflight) {
				this._inflight = true;
				var XHR = this,
					_xhr = this._xhr,
					timeout = function() {
						console.log("XHR REQUEST TIMED OUT");
						_xhr.abort();
						if (XHR._ontimeout) XHR._ontimeout();
					},
					onreadystatechange = function() {
						var sofar = (new Date()).valueOf() - XHR._start;
						clearTimeout(XHR._timeout);
						if (_xhr.readyState < 4) {
							if (XHR._debug) {
								console.log("XHR READY STATE " + _xhr.readyState 
									+ " TAKEN " + sofar 
									+ " TIMEOUT " + (sofar + XHR.timeouts[_xhr.readyState])); 
							}
							XHR._timeout = setTimeout(timeout,XHR.timeouts[_xhr.readyState]);
							if (XHR._onprogress) XHR._onprogress(_xhr, XHR);
						} else {
							delete XHR._inflight;
							if (XHR._debug) {
								console.log("XHR COMPLETE STATUS " + _xhr.status + " TOOK " + sofar);
							}
							if (XHR._onprogress) XHR._onprogress(_xhr, XHR);
							if (_xhr.status == 200 && XHR._onload) {
								XHR._onload(_xhr, XHR);
							}
						}
					};
				this._start = (new Date()).valueOf();
				this._timeout = setTimeout(timeout, this.timeouts[0]);
				_xhr.onreadystatechange = onreadystatechange;
				_xhr.open(this.method, this.uri, this.sync, this.user, this.password);
				try {
					_xhr.send(this.postData);
				} catch(e) {
					if (XHR._onerror) XHR._onerror(e);
				}
			}
			return this;
		}
	}
}
