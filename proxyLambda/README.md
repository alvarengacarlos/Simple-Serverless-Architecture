# Proxy Lambda

## Deploy
- Configure your dotenv changing the IS_DEPLOY variable to true and setting your region:
```.env
IS_DEPLOY=true
DYNAMO_DB_REGION="us-east-1"
```
- Install all production dependencies:
```bash
npm install --omit=dev
```

## Development
- Configure your dotenv changing the IS_DEPLOY variable to false:
```.env
IS_DEPLOY=false
```

- Run these "migrations" to create some tables:
```bash
npm run migrate
```

You can use `docker-compose-dev.yaml` file to help you develop:
```bash
docker compose -f docker-compose-dev.yaml run --rm --service-ports -u node proxyLambda bash
```

- To down the environment use:
```bash
docker compose -f docker-compose-dev.yaml down
```

[back](../stacks/README.md)