const initializeSocketClient = () => {
	const socket = io.connect('http://localhost:3000', {
		cors: {
			origin: '*'
		}
	});

	socket.on('connect', (data) => {
		console.log('Connected');
		console.log(data);
		socket.emit('Hello from client');
	});
};

const submitSong = (song) => {
	console.log('Sending song:' + song);
	socket.emit('guess', song);
}

const initializeMainContent = () => {
	const mainContent = document.getElementById('mainContent');

	const connection = true; // should be setup with Socket IO
	const loaderContainer = document.getElementById('loaderContainer');

	const loaderContainer2 = document.createElement('div');
	loaderContainer2.className = 'loaderContainer';

	const loader = document.createElement('div');

	loader.className = 'spinner';
	loader.appendChild(document.createElement('div'));
	loader.appendChild(document.createElement('div'));
	loader.appendChild(document.createElement('div'));

	if (connection) {
		loaderContainer.appendChild(loader);
	}
};

(function () {
	initializeMainContent();
	initializeSocketClient();
})();
