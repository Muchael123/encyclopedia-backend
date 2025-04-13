

const generateVerificationCode = () => {
  //generate a random int from 100000 to 999999`
  const crypto = Math.floor(100000 + Math.random() * 900000);
    return crypto
  };
export default generateVerificationCode;