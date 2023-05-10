# Deploy the Stacks
>__NOTE 0:__ Login your AWS CLI to continue.

>__NOTE 1:__ Run these commands in sequence and inside stacks directory.

>__NOTE 2:__ Wait for each stack to complete the build to run the next command.

## Amazon DynamoDB
- Run this command to create Amazon DynamoDB stack:
```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-amazon-dynamodb --template-body file://$(pwd)/amazon-dynamodb.yaml
```

## Amazon S3 and Buckets
```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-amazon-s3-bucket --template-body file://$(pwd)/amazon-s3-bucket.yaml
```

## AWS Lambda
- Access proxyLambda to configure your Proxy Lambda to deploy following [this steps](../proxyLambda/README.md).

- Run this command:
```bash
zip -r ../simple-serverless-arch-proxy-lambda.zip .
```

```bash
aws s3 cp ../simple-serverless-arch-proxy-lambda.zip s3://simple-serverless-arch-amazon-s3-bucket-proxy-lambda
```

- Access the stacks directory again and run this command:
```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-aws-lambda --template-body file://$(pwd)/aws-lambda.yaml --capabilities CAPABILITY_NAMED_IAM
```

## Amazon Api Gateway
- Change the S3_BUCKET_URL parameter below by your front end application url.
- Run this command:
```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-api-gateway --template-body file://$(pwd)/amazon-api-gateway.yaml --parameters ParameterKey=AllowCorsForWhatOrigin,ParameterValue=S3_BUCKET_URL ParameterKey=DeployStage,ParameterValue=dev
```

## Front End
- Access frontEnd directory and change BASE_URL constant to your API Gateway url. Eg:
```javascript
const BASE_URL = 'https://hdnotu40d9.execute-api.us-east-1.amazonaws.com'
```

- Run these commands to upload the Front End:
```bash
aws s3 cp ../frontEnd/index.html ../frontEnd/error.html s3://simple-serverless-arch-amazon-s3-bucket-front-end

aws s3 cp ../frontEnd/error.html s3://simple-serverless-arch-amazon-s3-bucket-front-end
```

# Down stacks
Access your Aws Console and delete the stacks in reverse order. Also, do not forget that before you delete the bucket stack you must delete all files inside it.

[back](../README.md)