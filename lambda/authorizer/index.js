const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const keyClient = jwksClient({
  cache: true,
  cacheMaxAge: 86400000, //value in ms
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  strictSsl: true,
  jwksUri: process.env.JWKS_URI
})

const verificationOptions = {
  // verify claims, e.g.
  // "audience": "urn:audience"
  "algorithms": "RS256"
}

const allow = (e) => {
  return {
    "principalId": "user",
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [{
        "Action": "execute-api:Invoke",
        "Effect": "Allow",
        "Resource": e.methodArn
      }]
    },
    "context": {
      "user": "",
    }
  }
};

function getSigningKey(header = decoded.header, callback) {
  keyClient.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  })
}

function extractTokenFromHeader(e) {
  if (e.authorizationToken && e.authorizationToken.split(' ')[0] === 'Bearer') {
    return e.authorizationToken.split(' ')[1];
  } else {
    return e.authorizationToken;
  }
}

function validateToken(token, callback, event) {
  jwt.verify(token, getSigningKey, verificationOptions, function (error, decoded) {
    if (error) {
      callback("Unauthorized");
    } else {
      var response = allow(event);
      response.context.user = decoded.sub;
      callback(null, response);
    }
  });
}

exports.handler = (event, context, callback) => {
  let token = extractTokenFromHeader(event) || '';
  validateToken(token, callback, event);
};