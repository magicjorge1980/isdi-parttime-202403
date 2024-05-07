if (logic.isUserLoggedIn()) location.href = '../home'
const view = new Component(document.body)
view.addClass('View')

const logo = new Image()
// logo.alt('logo')
logo.setUrl('../src/logo.png')
logo.addClass('Logo')

const header = new Component('header')
view.add(header)
const headerTitle = new Component('h1')
headerTitle.setText('ocialCode')
header.add(logo)
header.add(headerTitle)

const loginForm = new LoginForm()
view.add(loginForm)
let linkCreated = false

//onclick password
const icon = document.getElementById('icon')
const passField = document.getElementById('password')

icon.onclick = () => {
  showPass(icon, passField, 'password', 'text')
}

loginForm.onSubmit((event) => {
  event.preventDefault()
  const username = loginForm.getUsername()
  const password = loginForm.getPassword()
  try {
    logic.loginUser(username, password)
  } catch (error) {
    if (error instanceof ContentError) {
      loginForm.setFeedback(error.message + ', porfavor corrígelo')
      setTimeout(() => {
        loginForm.clear()
      }, 2000)
      if (!linkCreated) {
        const link = new Link()
        link.setUrl('../register/index.html')
        link.setTarget('_blank')
        link.setText('¿olvidaste tu contraseña?')
        link.addClass('forgot-pass')
        loginForm.add(link)
        linkCreated = true
      }
    } else if (error instanceof MatchError) {
      loginForm.setFeedback('error de credenciales')
      setTimeout(() => {
        loginForm.clear()
      }, 2000)
    } else {
      loginForm.setFeedback('Hay un error, lo solucionaremos lo antes posible')
    }
  }
})

const link = new Link()
link.setUrl('../register/index.html')
link.setTarget('_blank')
link.setText('Register')
view.add(link)
