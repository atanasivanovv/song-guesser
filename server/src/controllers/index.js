const fs = require('fs');
const path = require('path');
const encryptService = require('../services/encrypt/index');

const home = async (req, res) => {
  res.send(
    'Welcome to the Song guesser API!\nCreated by Atanas Ivanov & Ivaylo Stoyanov\n@FMI'
  );
};

const tracks = async (req, res) => {
  try {
    const encryptedSongs = [];
    const DB_FOLDER_PATH = path.join(__dirname, '../music');
    fs.readdir(DB_FOLDER_PATH, (err, files) => {
      files.forEach((file) => {
        encryptedSongs.push(encryptService.encrypt(file));
      });
      res.send(encryptedSongs);
    });
  } catch (error) {
    res.send(error);
  }
};

const song = async (req, res) => {
  try {
    const { iv, encryptedData } = req.query;
    const songName = encryptService.decrypt({ iv, encryptedData });
    const filePath = path.join(__dirname, `../music/${songName}`);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  home,
  tracks,
  song,
};
