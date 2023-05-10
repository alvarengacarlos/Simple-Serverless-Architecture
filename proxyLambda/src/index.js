const { env } = require('process')

const serverless = require('serverless-http');
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const ResponsePattern = require('./response-pattern')
const { WordDto, WordCategoryDto } = require('./dto')
const Model = require('./model')
const Logger = require('./logger')

const app = express()
const model = new Model()

/**
 * Config
 */
app.use(express.json())
app.use(cors())

/**
 * Routes
 */

app.get('/info', async (request, response) => {
  try {   
    const dateTime = new Date().toISOString()
    return ResponsePattern.ok(response, 'it is working', {dateTime: dateTime})

  } catch (error) {
    return ResponsePattern.internalServerError(response)
  }
})

//Words
app.get('/words/:userId/:word', async (request, response) => {
  try {   
    const { userId, word } = request.params

    const data = await model.readWord(userId, word)

    if (!data) {
      return ResponsePattern.notFound(response)
    }

    return ResponsePattern.ok(response, 'success', data)

  } catch (error) {
    return ResponsePattern.internalServerError(response)
  }
})

app.get('/words/:userId', async (request, response) => {
  try {
    const { userId } = request.params

    const data = await model.readWords(userId)

    if (!data) {
      return ResponsePattern.notFound(response)
    }

    return ResponsePattern.ok(response, 'success', data)

  } catch (error) {
    return ResponsePattern.internalServerError(response)
  }
})

app.post('/words/:userId', async (request, response) => {
  try {
    const { userId } = request.params
    const { word, wordCategory } = request.body
    
    const wordCategoryDto = new WordCategoryDto(wordCategory)
    const wordDto = new WordDto(userId, word, wordCategoryDto)
    
    await model.createWord(wordDto)

    return ResponsePattern.created(response, 'success')

  } catch (error) {
    return ResponsePattern.internalServerError(response)
  }
})

app.patch('/words/:userId', async (request, response) => {
  try {
    const { userId } = request.params
    const { word, wordCategory } = request.body
    
    const wordCategoryDto = new WordCategoryDto(wordCategory)
    const wordDto = new WordDto(userId, word, wordCategoryDto)

    const data = await model.updateWord(wordDto)
    if (!data) {
      return ResponsePattern.notFound(response)
    }

    return ResponsePattern.ok(response, 'success', data)

  } catch (error) {
    return ResponsePattern.internalServerError(response)
  }
})

app.delete('/words/:userId/:word', async (request, response) => {
  try {
    const { userId, word } = request.params

    const data = await model.deleteWord(userId, word)

    if (!data) {
      return ResponsePattern.notFound(response)
    }

    return ResponsePattern.ok(response, 'success', data)
    
  } catch (error) {
    return ResponsePattern.internalServerError(response)
  }
})

// Word categories
app.get('/word-categories/:name', async (request, response) => {
  try {   
    const { name } = request.params

    const data = await model.readWordCategory(name)

    if (!data) {
      return ResponsePattern.notFound(response)
    }

    return ResponsePattern.ok(response, 'success', data)

  } catch (error) {
    return ResponsePattern.internalServerError(response)
  }
})

app.get('/word-categories', async (request, response) => {
  try {
    const data = await model.readWordCategories()

    if (!data) {
      return ResponsePattern.notFound(response)
    }

    return ResponsePattern.ok(response, 'success', data)

  } catch (error) {
    return ResponsePattern.internalServerError(response)
  }
})

app.post('/word-categories', async (request, response) => {
  try {    
    const { name } = request.body
    
    const wordCategoryDto = new WordCategoryDto(name)    
    
    await model.createWordCategory(wordCategoryDto)

    return ResponsePattern.created(response, 'success')

  } catch (error) {
    return ResponsePattern.internalServerError(response)
  }
})

app.delete('/word-categories/:name', async (request, response) => {
  try {
    const { name } = request.params

    const data = await model.deleteWordCategory(name)

    if (!data) {
      return ResponsePattern.notFound(response)
    }

    return ResponsePattern.ok(response, 'success', data)
    
  } catch (error) {
    return ResponsePattern.internalServerError(response)
  }
})

/**
 * Server
 */
if (env.IS_DEPLOY == 'true') {
  const handler = serverless(app, {provider: 'aws'})
  module.exports.handler = async function (event, context) {
    const result = await handler(event, context)

    return result
  }

} else {
  app.listen(env.API_PORT, Logger.info(`Server is running in ${env.API_PORT} port`))    
}