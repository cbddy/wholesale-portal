const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  googleID: {
    type: String,
    default: null
  },
  //   email: {
  //     type: String,
  //   },
  //   password: {
  //     type: String,
  //   },
  name: {
    type: String
  },
  paymentVerified: {
    type: Boolean,
    default: false
  },
  docusignVerified: {
    type: {},
  },
  documentSigned: {
    type: Boolean,
    default: false
  },
  goCardlessID: {
    type: String
  },
  goCardlessMandate: {
    type: String
  }
})

module.exports = User = mongoose.model('user', UserSchema)
