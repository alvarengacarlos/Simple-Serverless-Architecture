# Deploy the Stacks
>__NOTE 0:__ Login your AWS CLI to continue.

>__NOTE 1:__ Run these commands in sequence.

>__NOTE 2:__ Wait for each stack to complete the build to run the next command.

## Amazon DynamoDB
- Run this command to create Amazon DynamoDB stack:
```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-amazon-dynamodb --template-body file://$(pwd)/amazon-dynamodb.yaml
```

## AWS Lambda
- Run these commands to create AWS Lambda stack:

```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-amazon-s3-bucket --template-body file://$(pwd)/amazon-s3-bucket.yaml
```

```bash
zip -r ../app.zip ../app/
```

```bash
aws s3 cp ../app.zip s3://simple-serverless-arch-amazon-s3-bucket-ProxyLambdaS3Bucket/
```

```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-aws-lambda --template-body file://$(pwd)/aws-lambda.yaml
```
--capabilities CAPABILITY_IAM

## Amazon Api Gateway
- Run this command:
```bash
aws cloudformation create-stack --stack-name simple-serverless-arch-api-gateway --template-body file://$(pwd)/amazon-api-gateway.yaml --parameters ParameterKey=AllowCorsForWhatOrigin,ParameterValue=S3_BUCKET_URL ParameterKey=DeployStage,ParameterValue=dev
```

[back](../README.md)