var mongoose = require('mongoose')
var userPlugin = require('mongoose-user')

var UserSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
});

UserSchema.plugin(userPlugin, {});

mongoose.model('User', UserSchema);
mongoose.connect( 'mongodb://localhost/piwatch' );