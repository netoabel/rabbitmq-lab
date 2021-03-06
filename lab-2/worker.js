'use strict';
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		var q = 'taskQueue';

		ch.assertQueue(q, {durable: true});

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

		ch.consume(q, function(msg) {
			var secs = msg.content.toString().split('.').length - 1;

			console.log(" [x] Received %s", msg.content.toString());
			setTimeout(function() {
				console.log(" [x] Done");
				ch.ack(msg);
			}, secs * 1000);
		});
	});
});