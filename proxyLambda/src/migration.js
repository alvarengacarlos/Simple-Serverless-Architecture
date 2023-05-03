const { env } = require('process')
const { log, error } = require('console')

require('dotenv').config()
const { CreateTableCommand } = require('@aws-sdk/client-dynamodb')

const client = require('./dynamodb-client')

const WordTable = {
  AttributeDefinitions: [
    {
      AttributeName: "UserId",
      AttributeType: "S",
    },
    {
      AttributeName: "Word",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "UserId",
      KeyType: "HASH",
    },
    {
      AttributeName: "Word",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2,
  },
  TableName: env.DYNAMO_DB_WORD_TABLE_NAME,
  StreamSpecification: {
    StreamEnabled: false,
  },
}

const WordCategoryTable = {
  AttributeDefinitions: [
    {
      AttributeName: "WordsCategory",
      AttributeType: "S",
    }
  ],
  KeySchema: [
    {
      AttributeName: "WordsCategory",
      KeyType: "HASH",
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2,
  },
  TableName: env.DYNAMO_DB_WORD_CATEGORY_TABLE_NAME,
  StreamSpecification: {
    StreamEnabled: false,
  },
}

client.send(new CreateTableCommand(WordTable))
.then(() => {
  log('migrated')
})
.catch((error) => {
  error('Error: ', error.message)
})

client.send(new CreateTableCommand(WordCategoryTable))
.then(() => {
  log('migrated')
})
.catch((error) => {
  error('Error: ', error.message)
})