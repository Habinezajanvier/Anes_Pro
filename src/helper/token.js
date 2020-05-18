import jwt from 'jsonwebtoken';

const genToken = (payload) => {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey, {
    algorithm: 'HS256',
    expiresIn: '48h'
  });
  return token;
};

export default genToken;
