const initializeSocketClient = () => {
	// should be setup on the backend to recognize 'io'
	const socket = io.connect('http://localhost:3000');
	socket.on('connect', (data) => {
		socket.emit('Hello from client');
	});
};

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
