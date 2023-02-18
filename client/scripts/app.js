const mainContent = document.getElementById('mainContent');
const gameContent = document.getElementById('gameContent');
const songs = [];
let socket = null;

const prepareSongs = () => {
	fetch('http://localhost:3000/songs')
		.then(response => response.json())
		.then(data => songs.push(...data))
	.catch(error => console.error(error));;
}

const handlePlayNextSong = () => {
	if (!songs?.length) {
		return;
	}
	const song = songs[songs.length - 1];
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
	
	songs.pop();
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
	}, 1000);
}

const handleShowSong = ({clientId}) => {
	const playingAgainst = document.createElement('h2');
	const guessRightBtn = document.createElement('button');
	guessRightBtn.innerText = 'GUESS';
	guessRightBtn.addEventListener('click', () => {
		socket.emit('guess');
	})
	playingAgainst.innerText = `You are playing against client: ${clientId}`;
	
	const songPlayingHeader = document.createElement('h1');
	songPlayingHeader.innerText = 'Guess the song which is currently playing:';

	gameContent.appendChild(playingAgainst);
	gameContent.appendChild(songPlayingHeader);
	gameContent.appendChild(guessRightBtn);
}

const handleGameStart = async (data) => {
	clearMainContent();
	handleGameStarting(data);
	handlePlayNextSong();
}

const initializeSocketClient = () => {
	socket = io.connect('http://localhost:3000', {
		cors: {
			origin: '*'
		}
	});

	socket.on('game_start', (data) => {
		console.log('Game started!');
		handleGameStart(data);
	})

	socket.on('correct_guess', () => {
		handlePlayNextSong();
	})
};

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
	})
};

(function () {
	prepareSongs();
	initializeMainContent();
})();
