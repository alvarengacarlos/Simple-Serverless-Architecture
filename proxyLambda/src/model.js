const { env } = require('process')

const { PutItemCommand, GetItemCommand, QueryCommand, ScanCommand, UpdateItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb')
require('dotenv').config()

const Logger = require('./logger')
const client = require('./dynamodb-client')

module.exports = class Model {
  
  constructor() {
    this._dbClient = client
  }

  /**
   * Word
   */
  async createWord(wordDto) {
    const params = {
      TableName: env.DYNAMO_DB_WORD_TABLE_NAME,
      Item: {
        UserId: {S: wordDto.userId},
        Word: {S: wordDto.word},
        CategoryName: {S: wordDto.categoryName}
      }
    }
    
    try {
      Logger.info('model::createWord::sending command')

      await this._dbClient.send(new PutItemCommand(params))
    
    } catch (error) {
      Logger.error(`model::createWord::${error.message}`)

      throw new Error('Internal server error')
    }
  }

  async readWord(userId, word) {
    const params = {
      TableName: env.DYNAMO_DB_WORD_TABLE_NAME,
      Key: {
        UserId: {S: userId},
        Word: {S: word},
      }
    }
    
    try {
      Logger.info('model::readWord::sending command')

      const result = await this._dbClient.send(new GetItemCommand(params))
      return result.Item
    
    } catch (error) {
      Logger.error(`model::readWord::${error.message}`)

      throw new Error('Internal server error')
    }
  }

  async readWords(userId) {
    const params = {
      TableName: env.DYNAMO_DB_WORD_TABLE_NAME,
      KeyConditionExpression: 'UserId = :userId',
      ExpressionAttributeValues: {
        ":userId": { S: userId }
      }
    }
    
    try {
      Logger.info('model::readWords::sending command')

      const result = await this._dbClient.send(new QueryCommand(params))
      return result.Items
    
    } catch (error) {  
      Logger.error(`model::readWords::${error.message}`)

      throw new Error('Internal server error')
    }
  }

  async updateWord(wordDto) {    
    const result = await this.readWord(wordDto.userId, wordDto.word)
    if (!result) {
      return result
    }

    const params = {
      TableName: env.DYNAMO_DB_WORD_TABLE_NAME,
      Key: {
        UserId: {S: wordDto.userId},
        Word: {S: wordDto.word}        
      },
      UpdateExpression: "set CategoryName = :CategoryName",
      ExpressionAttributeValues: {
        ":CategoryName": {S: wordDto.categoryName}
      }
    }
    try {
      Logger.info('model::updateWord::sending command')      

      await this._dbClient.send(new UpdateItemCommand(params))
      return wordDto.categoryName
    
    } catch (error) {
      Logger.error(`model::updateWord::${error.message}`)

      throw new Error('Internal server error')
    }
  }

  async deleteWord(userId, word) {
    const result = await this.readWord(userId, word)
    if (!result) {
      return result
    }

    const params = {
      TableName: env.DYNAMO_DB_WORD_TABLE_NAME,
      Key: {
        UserId: {S: userId},
        Word: {S: word}        
      }
    }

    try {
      Logger.info('model::deleteWord::sending command')      

      await this._dbClient.send(new DeleteItemCommand(params))
      return word
    
    } catch (error) {
      Logger.error(`model::deleteWord::${error.message}`)

      throw new Error('Internal server error')
    }
  }

  /**
   * Word category
   */
  async createWordCategory(wordCategoryDto) {
    const params = {
      TableName: env.DYNAMO_DB_WORD_CATEGORY_TABLE_NAME,
      Item: {
        WordsCategory: {S: wordCategoryDto.name}
      }
    }
    
    try {
      Logger.info('model::createWordCategory::sending command')

      await this._dbClient.send(new PutItemCommand(params))
    
    } catch (error) {
      Logger.error(`model::createWordCategory::${error.message}`)

      throw new Error('Internal server error')
    }
  }

  async readWordCategory(name) {
    const params = {
      TableName: env.DYNAMO_DB_WORD_CATEGORY_TABLE_NAME,
      Key: {
        WordsCategory: {S: name}
      }
    }
    
    try {
      Logger.info('model::readWordCategory::sending command')

      const result = await this._dbClient.send(new GetItemCommand(params))
      return result.Item
    
    } catch (error) {
      Logger.error(`model::readWordCategory::${error.message}`)

      throw new Error('Internal server error')
    }
  }

  async readWordCategories() {
    const params = {
      TableName: env.DYNAMO_DB_WORD_CATEGORY_TABLE_NAME
    }
    
    try {
      Logger.info('model::readWords::sending command')

      const result = await this._dbClient.send(new ScanCommand(params))
      return result.Items
    
    } catch (error) {  
      Logger.error(`model::readWords::${error.message}`)

      throw new Error('Internal server error')
    }
  }

  async deleteWordCategory(name) {
    const result = await this.readWordCategory(name)
    if (!result) {
      return result
    }

    const params = {
      TableName: env.DYNAMO_DB_WORD_CATEGORY_TABLE_NAME,
      Key: {
        WordsCategory: {S: name}
      }
    }

    try {
      Logger.info('model::deleteWordCategory::sending command')      

      await this._dbClient.send(new DeleteItemCommand(params))
      return name
    
    } catch (error) {
      Logger.error(`model::deleteWordCategory::${error.message}`)

      throw new Error('Internal server error')
    }
  }

}