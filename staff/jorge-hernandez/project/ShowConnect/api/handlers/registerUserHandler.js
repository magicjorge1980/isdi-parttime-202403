import logic from '../logic/index.js'

export default (req, res, next) => {
  const {
    name,
    artisticName,
    discipline,
    city,
    description,
    email,
    images,
    video,
    password,
    passwordRepeat,
  } = req.body

  try {
    logic
      .registerUser(
        name,
        artisticName,
        discipline,
        city,
        description,
        email,
        images,
        video,
        password,
        passwordRepeat
      )
      .then(() => res.status(201).send())
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
}
