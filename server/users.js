const users = [];

function userJoin(id, name, room) {
  const user = { id, name, room };
  users.push(user);
  return user;
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const user = users.splice(index, 1)[0];
    return user;
  }
}

function geUser(id) {
  return users.find((user) => user.id === id);
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

function getAllRooms() {
  const roomSet = new Set();
  users.forEach((user) => {
    if (user.room) roomSet.add(user.room);
  });
  return [...roomSet.keys()];
}

module.exports = {
  userJoin,
  userLeave,
  geUser,
  getRoomUsers,
  getAllRooms,
};
