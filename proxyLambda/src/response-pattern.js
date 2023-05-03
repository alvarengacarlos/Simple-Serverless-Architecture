module.exports = class ResponsePattern {

  static ok(response, message, data = null) {
    return response.status(200).json({
      message: message,
      data: data
    })
  }

  static created(response, message) {
    return response.status(200).json({
      message: message
    })
  }

  static notFound(response) {
    return response.status(200).json({
      message: 'Not found'
    })
  }

  static internalServerError(response) {
    return response.status(500).json({
      message: 'Internal server error'
    })
  }

  static badRequest(response) {
    return response.status(400).json({
      message: 'Bad request'
    })
  }

}