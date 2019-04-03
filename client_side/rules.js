module.exports = {
  upperCase: {
    message: 'Must have at least one upper-case letter',
    pattern: /([A-Z]+)/
  },
  lowerCase: {
    message: 'Must have at least one lower-case letter',
    pattern: /([a-z]+)/
  },
  special: {
    message: 'Must have at least one special character !, @, #, $, %, ^, &, *, (, )',
    pattern: /([!@#$%^&*()]+)/
  },
  number: {
    message: 'Must have at least one number',
    pattern: /([0-9]+)/
  },
  minimumChars: {
    message: 'Must be at least 8 characters',
    pattern: /(.{8,})/
  }
}