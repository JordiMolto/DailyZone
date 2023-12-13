export function validateEmail(email) {
  const regex = /^\S+@\S+\.\S+$/;
  if (!email) {
    return (this.errors.userEmail = "El correo electrónico es requerido");
  } else if (!regex.test(email)) {
    return (this.errors.userEmail =
      "El formato del correo electrónico no es válido");
  } else {
    return (this.errors.userEmail = "");
  }
}

export function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password)
    ? ""
    : "La contraseña no cumple con los requisitos";
}

// export function validatePasswordMatch(password1, password2) {
//   return password1 === password2 ? "" : "Las contraseñas no coinciden";
// }
