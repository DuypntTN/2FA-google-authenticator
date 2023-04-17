const speakeasy = require('speakeasy')
exports.verifyTFACode = (secret, token, type) => {
  console.log(secret, token, type)
  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: type,
    token: typeof token === 'string' ? parseInt(token) : token,
  })
  return verified
}
