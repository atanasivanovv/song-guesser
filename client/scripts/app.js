const mainContent = document.getElementById('mainContent');
const gameContent = document.getElementById('gameContent');
const songs = [];

const prepareSongs = () => {
	fetch('http://localhost:3000/songs')
		.then(response => response.json())
		.then(data => songs.push(...data));
}

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

	socket.on('game_start', (data) => {
		console.log('Game started!');
		handleGameStart(data);
		const songs = data.songs;
		const audio = document.getElementById('audioPlayer');
		audio.src = songs[0];
		audio.play();
	})

	console.log(songs);
};

const submitSong = (song) => {
	console.log('Sending song:' + song);
	socket.emit('guess', song);
}

const initializeLoader = () => {
	const loaderContainer = document.getElementById('loaderContainer');
	const loader = document.createElement('div');
	const loaderMessage = document.createElement('p');
	loaderMessage.innerHTML = 'Searching for your oponent...';

	loader.className = 'spinner';
	loader.appendChild(document.createElement('div'));
	loader.appendChild(document.createElement('div'));
	loader.appendChild(document.createElement('div'));
	
	loaderContainer.appendChild(loaderMessage);
	loaderContainer.appendChild(loader);
}

const initializeMainContent = () => {
	const findOponentButton = document.getElementById('findBtn');
	
	findOponentButton.addEventListener('click', () => {
		findOponentButton.style.display = 'none';
		initializeLoader();
		initializeSocketClient();
		const song = songs[0];
		var queryString = Object.keys(song).map(key => key + '=' + song[key]).join('&');


		fetch(`http://localhost:3000/song?${queryString}`)
			.then(response => response.blob())
			.then(blob => {
				const url = URL.createObjectURL(blob);
				const audio = document.getElementById('audioPlayer');
				audio.src = url;
				audio.play();
			})
		.catch(error => console.error(error));
	})
};

(function () {
	prepareSongs();
	initializeMainContent();
})();
