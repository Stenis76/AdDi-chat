const users = [];

const rooms = {};

function userJoin(id, name, roomName, password = null) {
  const user = { id, name, roomName };

  //room does not exist
  if (rooms[roomName] === undefined) {
    console.log("DND");

    rooms[roomName] = password; // create room
    users.push(user); // add user
  }
  // no password
  else if (rooms[roomName] === null) {
    console.log("no pass");

    users.push(user); // add user
  }
  // password
  else {
    console.log("password");

    if (rooms[roomName] === password) {
      users.push(user); // add user
    } else {
      return null;
    }
  }

  console.log("rooms", rooms);

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
  return users.filter((user) => user.roomName === room);
}

function getAllRooms() {
  const roomSet = new Set();
  users.forEach((user) => {
    if (user.roomName) roomSet.add(user.roomName);
  });
  return [...roomSet.keys()];
}

// rooms = {
//   "General": "123",
//   "hej" : null
// }

/*
[
  ["General", "123"].
  ["hej", null]
]

[
  { name: "General",
    password: "123"  
  },
  {
     name: "hej",
    password: null 
  }
]
*/

function getRooms() {
  return Object.entries(rooms).map((entry) => ({
    name: entry[0],
    password: entry[1],
  }));
}

module.exports = {
  userJoin,
  userLeave,
  geUser,
  getRoomUsers,
  getAllRooms,
  getRooms,
};
