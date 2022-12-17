const home = async (req, res) => {
  res.send(
    'Welcome to the Mocked Gmail API!\nCreated by Atanas Ivanov & Ivaylo Stoyanov\n@FMI'
  );
};

module.exports = {
  home
};
