export function validatePassword(password){
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/;
  return re.test(password);
}
