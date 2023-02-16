const mainContent = document.getElementById('mainContent');
const gameContent = document.getElementById('gameContent');

let numOfClients = 0;

const clearMainContent = () => {
	let childToDelete = mainContent.lastChild;

	while (childToDelete) {
		mainContent.removeChild(childToDelete);
		childToDelete = mainContent.lastChild;
	}
}

const handleGameStarting = (data) => {
	gameContent.style.display = 'block';

	const gameStarting = document.querySelector('.starting');

	setTimeout(() => {
		gameStarting.style.display = 'none';

		handleShowSong(data);
	}, 3000);
}

const handleShowSong = ({clientId}) => {
	const playingAgainst = document.createElement('h2')
	playingAgainst.innerText = `You are playing against client: ${clientId}`;
	
	const songPlayingHeader = document.createElement('h1');
	songPlayingHeader.innerText = 'Guess the song which is currently playing:';

	gameContent.appendChild(playingAgainst);
	gameContent.appendChild(songPlayingHeader);
}

const handleGameStart = async (data) => {
	clearMainContent();

	handleGameStarting(data);
}

const initializeSocketClient = () => {
	const socket = io.connect('http://localhost:3000', {
		cors: {
			origin: '*'
		}
	});

	socket.on('connect', (data) => {
		console.log('Connected');
		numOfClients++;
		console.log(numOfClients);
		socket.emit('Hello from client');
	});

	socket.on('game_start', (data) => {
		console.log('Game started!');
		handleGameStart(data);
	})
};

const submitSong = (song) => {
	console.log('Sending song:' + song);
	socket.emit('guess', song);
}

const initializeMainContent = () => {
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
