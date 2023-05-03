const { env } = require('process')

require('dotenv').config()
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')

let client = null

if (env.IS_DEPLOY == "true") {  
  client = new DynamoDBClient({ region: env.DYNAMO_DB_REGION });
  
} else {
  console.log('local')
  client = new DynamoDBClient({ 
    endpoint: {
      hostname: 'dynamoDb',
      port: 8000,
      path: '',
      protocol: 'http:'
    },
    region: 'dynamoDb',
    credentials: {
      accessKeyId: '',
      secretAccessKey: ''
    }
  });
}

module.exports = client