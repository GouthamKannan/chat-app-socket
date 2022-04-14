const { client: mongoClient } = require("../model/mongodb");

// Connect to MongoDB database
const dbConnection = mongoClient.db("chat_application");

// Initialize the collections for the database
const chatCollection = dbConnection.collection("chat_details");


/**
 * Add a new chat mesage to database
 * @param {string} user_name : Name of user
 * @param {string} group_name : Group name
 * @param {string} timestamp : Timestamp of the message
 * @param {string} message : The message entered by the user
 * @returns ID of the inserted document
 */
const add_chat = async (user_name, group_name, timestamp, message) => {
  const response = await chatCollection.insertOne({
    user_name, group_name, timestamp, message
  });
  return response;
};


/**
 * Get chat history from the database
 * @returns The chat history array
 */
const get_chats = async (group_name) => {
  // Get the chat details from the DB collection
  const response = await chatCollection.find({group_name}).toArray();
  return response;
};

// Export the functions
module.exports = {
  add_chat,
  get_chats
};
