var EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{6,}$/

var logic = {}
//logic RegisterForm
logic.registerUser = function (email, username, password, repeatPassword) {
  if (!EMAIL_REGEX.test(email))
    throw new ContentError('Esta cuenta de correo no es correcta')

  if (!USERNAME_REGEX.test(username))
    throw new ContentError('nombre de usuario no válido')

  if (!PASSWORD_REGEX.test(password))
    throw new ContentError('La contraseña no cumple los criterios')

  if (password !== repeatPassword)
    throw new MatchError('los campos de contraseña no coinciden')

  var newUser = { email: email, username: username, password: password }

  var user = data.findUser(function (user) {
    return user.email === email || user.username === username
  })

  if (user) {
    throw new DuplicityError(
      'este email o nombre de usuario ya ha sido registrado anteriormente'
    )
  }

  data.insertUser(newUser)
}
//Logic Login

logic.loginUser = function (username, password) {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError('username no válido')
  }
  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError('password no válido')
  }
  var newUser = { username: username }
  var user = data.findUser(function (user) {
    return user.username === username
  })

  if (user) {
    if (user.password === password) {
      data.loginUser(newUser)
      window.location.href = '../home/index.html'
    } else {
      throw new ContentError('password incorrecto')
    }
  } else {
    alert('Usuario no existe. Serás redirigido a la página de registro.')
    window.location.href = '../register/index.html'
  }
}
