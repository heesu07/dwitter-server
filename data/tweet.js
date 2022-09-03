import { getTweets, getUsers } from '../database/database.js';
import * as userRepository from './auth.js';
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;

export async function getAll() {
  return getTweets()
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets()
    .find({ username: username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  const tweet = await getTweets().findOne({ _id: new ObjectId(id) })
  return mapOptionalTweet(tweet);
}

export async function create(text, userId) {
  const { name, username, url, email } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    username: username,
    name: name,
    email: email,
    url: url,
  };
  return getTweets()
    .insertOne(tweet)
    .then(data => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}

export async function update(id, text) {
  return getTweets()
  .findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { text } },
    { returnDocument: 'after' }
  )
  .then(result => result.value)
  .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets()
    .deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}