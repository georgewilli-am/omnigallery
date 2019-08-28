import { verify, VerifyOptions } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const keyClient = jwksClient({
  cache: true,
  cacheMaxAge: 86400000, //value in ms
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  strictSsl: true,
  jwksUri: process.env.JWKS_URI || ''
})

const verificationOptions: VerifyOptions = {
  // verify claims, e.g.
  // "audience": "urn:audience"
  "algorithms": ["RS256"]
}

const allow = (e: any) => {
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

function getSigningKey(header:any, callback: any) {
  keyClient.getSigningKey(header.kid, function (err:any, key:any) {
    if (err) console.error(err)

    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  })
}

function extractTokenFromHeader(e:any) {
  if (e.authorizationToken && e.authorizationToken.split(' ')[0] === 'Bearer') {
    return e.authorizationToken.split(' ')[1];
  } else {
    return e.authorizationToken;
  }
}

function validateToken(token: any, callback: any, event: any) {
  verify(token, getSigningKey, verificationOptions, function (error, decoded) {
    if (error) {
      callback("Unauthorized");
    } else {
      var response = allow(event);
      response.context.user = decoded.toString();
      callback(null, response);
    }
  });
}

exports.handler = (event: any, _context: any, callback: any) => {
  let token = extractTokenFromHeader(event) || '';
  validateToken(token, callback, event);
};