const generatePassword = (length = 15) => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%&*()_[]{}<>?';

  let password = '';

  password += lowercaseChars.charAt(
    Math.floor(Math.random() * lowercaseChars.length),
  );
  password += uppercaseChars.charAt(
    Math.floor(Math.random() * uppercaseChars.length),
  );
  password += numberChars.charAt(
    Math.floor(Math.random() * numberChars.length),
  );
  password += symbolChars.charAt(
    Math.floor(Math.random() * symbolChars.length),
  );

  for (let i = password.length; i < length; i++) {
    password += lowercaseChars.charAt(
      Math.floor(Math.random() * lowercaseChars.length),
    );
  }

  password = password.match(/.{1,5}/g)!.join('-');
  return password;
};

export default generatePassword;
