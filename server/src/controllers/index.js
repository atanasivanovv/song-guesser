const axios = require('axios');
const queryString = require('node:querystring');

const BASE64_AUTH = Buffer.from(
  process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET
).toString('base64');

const home = async (req, res) => {
  res.send(
    'Welcome to the Song guesser API!\nCreated by Atanas Ivanov & Ivaylo Stoyanov\n@FMI'
  );
};

const getToken = async () => {
  return await axios.post(
    'https://accounts.spotify.com/api/token',
    queryString.stringify({
      grant_type: 'client_credentials',
    }),
    {
      headers: {
        Authorization: `Basic ${BASE64_AUTH}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
};

const genres = async (req, res) => {
  try {
    const token = (await getToken()).data.access_token;
    const genresResponse = await axios.get(
      'https://api.spotify.com/v1/recommendations/available-genre-seeds',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.send(genresResponse.data.genres);
  } catch (error) {
    res.send(error.message);
  }
};

const tracks = async (req, res) => {
  try {
    const token = (await getToken()).data.access_token;
    const tracksResponse = await axios.get(
      'https://api.spotify.com/v1/playlists/4jhLkh8niYrv02FYCxQv7n?si/tracks',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const tracks = tracksResponse.data.tracks.items;
    const tracksIds = tracks.map((element) => element.track.id);
    res.send(tracksIds);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  home,
  genres,
  tracks,
};
