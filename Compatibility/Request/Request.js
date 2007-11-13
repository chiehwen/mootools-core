Object.toQueryString = Hash.toQueryString;

var XHR = new Class({

	Extends: Request,

	options: {
		update: false
	},

	initialize: function(url, options){
		arguments.callee.parent(options);
		this.onComplete = $empty;
		this.url = url;
	},

	request: function(data){
		return this.send(this.url, data);
	},

	send: function(url, data){
		if (!this.check(url, data)) return this;
		return arguments.callee.parent({url: url, data: data});
	},

	onSuccess: function(text, xml){
		if (this.options.update) $(this.options.update).empty().set('html', text);
		arguments.callee.parent(text, xml);
		this.fireEvent('onComplete', [text, xml]);
	}

});

var Ajax = XHR;