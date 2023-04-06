# __Simple Serverless Architecture__
This is a simple architecture used to store and retrieve any data delivered by the client.

## __Input Examples__:
- Example 1:
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "age": 18,
    "maritalStatus": "Single"
}
```

- Example 2:
```json
{
    "name": "John Doe",    
    "maritalStatus": "Single"
}
```

# Deploy
## Lambda
- Zip lambda function with this command:
```bash
zip -r proxyLambdaFunction.zip ./lambda
```
- Create a bucket to deploy lambda function with this command:
```bash
aws cloudformation create-stack --stack-name bucketToLambda --template-body file://$(pwd)/bucket.yaml
```
- Deploy a function with this command:
```bash
aws s3 cp $(pwd)/proxyLambdaFunction.zip s3://alvarenga-carlos-lambda-bucket/
```

```bash
aws cloudformation  create-stack --stack-name simpleServerlessArch --template-body file://$(pwd)/stack.yaml --capabilities CAPABILITY_IAM
```