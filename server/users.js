const users = [];

const addUser = (data) => {
  const existingUser = users.find(
    (user) => user.groupId === data.groupId && user.userId === data.userId
  );

  if (!data.userId || !data.groupId) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  // const user = { id, name, picture, room };

  users.push(data);
  // return { id, name: user.name, picture: user.picture };
  return data;
};

const removeUser = (userId) => {
  const index = users.findIndex((user) => user.userId === userId);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (userId) => users.find((user) => user.userId === userId);

const getUsersInRoom = (groupId) => users.filter((user) => user.groupId === groupId);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
