const speakeasy = require('speakeasy')

exports.generateTFACode = (secret) => {
  console.log(secret)
  const code = speakeasy.generateSecret({
    name: secret,
  })
  return code
}

// exports.verifyTFACode = (secret, token, type) => {
//   console.log(secret, token, type)
//   const verified = speakeasy.totp.verify({
//     secret: secret,
//     encoding: type,
//     token: token,
//   })
//   return verified
// }
