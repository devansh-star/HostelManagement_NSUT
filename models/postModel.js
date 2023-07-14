const mongoose = require('mongoose');
// const ttl = require('mongoose-ttl');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
  },
  image: {
    type: String,
    default: undefined,
  },
  des: {
    type: String,
    required: [true, 'Every post should have a description'],
  },
  org: {
    type: String,
  },
  to: {
    type: String,
    required: true,
  },
});

// postSchema.index({ lastModifiedDate: 1 }, { expireAfterSeconds: 10 });
// postSchema.plugin(ttl, { ttl: 10000 });
/*
postSchema.virtual('ofcl').get(function () {
  console.log(this.user.role);
  if (this.user.role !== 'student') {
    return true;
    // eslint-disable-next-line no-else-return
  } else {
    return false;
  }
});
*/
/*
postSchema.virtual('obId').get(function () {
  return this._id;
});
*/

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
