const users = [];

const rooms = {};

function userJoin(id, name, room) {
  const user = { id, name, room: room.name };

  //room does not exist
  if (rooms[room.name] === undefined) {
    rooms[room.name] = room.password; // create room
    users.push(user); // add user
  }
  // no password
  else if (rooms[room.name] === null) {
    users.push(user); // add user
  }
  // password
  else {
    if (rooms[room.name] === room.password) {
      users.push(user); // add user
    } else {
      return null;
    }
  }

  return user;
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const user = users.splice(index, 1)[0];

    const roomUsers = getRoomUsers(user.room);
    if (user.room !== "General" && roomUsers.length === 0) {
      delete rooms[user.room];
    }

    return user;
  }
}

function geUser(id) {
  return users.find((user) => user.id === id);
}

function getRoomUsers(roomName) {
  return users.filter((user) => user.room === roomName);
}

// function getAllRooms() {
//   const roomSet = new Set();
//   users.forEach((user) => {
//     if (user.roomName) roomSet.add(user.roomName);
//   });
//   return [...roomSet.keys()];
// }

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
  getRooms,
};
