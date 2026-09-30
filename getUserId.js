const mongoose = require('mongoose');
const userModel = require('./Modal/userModal.js');

const MONGO_URI = process.env.MONGO_URI ||
  'mongodb+srv://gaurbhaiya:gaur@gaur.ewadmvd.mongodb.net/BordertaxGaur';

async function main() {
  await mongoose.connect(MONGO_URI);
  const user = await userModel.findOne({});
  if (!user) {
    console.log('No user found in database.');
  } else {
    console.log('User ID:', user._id.toString());
    console.log('Username:', user.username);
  }
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
