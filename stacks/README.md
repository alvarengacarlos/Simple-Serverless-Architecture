# Deploy the Stacks
>__NOTE 0:__ Login your AWS CLI to continue.

>__NOTE 1:__ Run these commands in sequence and inside stacks directory.

>__NOTE 2:__ Wait for each stack to complete the build to run the next command.

## Amazon DynamoDB
- Run this command to create Amazon DynamoDB stack:
```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-amazon-dynamodb --template-body file://$(pwd)/amazon-dynamodb.yaml
```

## AWS Lambda
- Configure your Proxy Lambda to deploy following [this steps](../proxyLambda/README.md).

- Access proxyLambda directory to run this command:
```bash
zip -r ../simple-serverless-arch-proxy-lambda.zip .
```

- Access stacks directory and run these commands to create AWS Lambda stack:

```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-amazon-s3-bucket --template-body file://$(pwd)/amazon-s3-bucket.yaml
```

```bash
aws s3 cp ../simple-serverless-arch-proxy-lambda.zip s3://simple-serverless-arch-amazon-s3-bucket-proxy-lambda/
```

```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-aws-lambda --template-body file://$(pwd)/aws-lambda.yaml --capabilities CAPABILITY_NAMED_IAM
```

## Amazon Api Gateway
- Change the S3_BUCKET_URL parameter below by your front end application url.
- Run this command:
```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-api-gateway --template-body file://$(pwd)/amazon-api-gateway.yaml --parameters ParameterKey=AllowCorsForWhatOrigin,ParameterValue=S3_BUCKET_URL ParameterKey=DeployStage,ParameterValue=dev
```

[back](../README.md)