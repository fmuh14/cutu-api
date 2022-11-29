export function validateEmail(email: string) {
  return !email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export function validatePassword(password: string) {
  return !password.match(
    /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/
  )
}

export function validatePasswordLength(password: string) {
  let minPasswordofChars = 8;
  let maxPasswordofChars = 16;
  if (password.length < minPasswordofChars || password.length > maxPasswordofChars) {
    return true
  }
}

export function validatePhoneNumber(phone_number: string) {
  let minNumberofChars = 8;
  let maxNumberofChars = 15;
  if (phone_number.length < minNumberofChars || phone_number.length > maxNumberofChars) {
    return true
  }
}

