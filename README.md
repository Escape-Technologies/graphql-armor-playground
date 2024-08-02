# GraphQL Armor Playground

This API has been created for the sole purpose of having a very basic GraphQL app to demo [GraphQL Armor](https://github.com/Escape-Technologies/graphql-armor) at [DEFCON32](https://defcon.org/html/defcon-32/dc-32-index.html), and with which anybody can toy, so as to test [GraphQL Armor's](https://github.com/Escape-Technologies/graphql-armor) features easily.

## Usage

To manage the application using `Docker Compose`, simply use the provided `Makefile` commands:

```bash
# To start the application:
make start

# To stop the application:
make stop

# To clean up Docker images and containers:
make clean

# To rebuild the Docker image:
make rebuild

# To restart the application:
make restart

# To start the app with logs
make logs
```

If `Docker Compose` is not installed on your machine, you can manually build and run the Docker container with the following commands:

```bash
docker build -t graphql-armor-playground . && docker run -p 4000:4000 graphql-armor-playground
```

## Accessing the Application

To access the app, open <http://localhost:4000/default/graphql> or <http://localhost:4000/secure/graphql> to access both endpoints. The Apollo Playground is activated, allowing you to interact with the apps from there.

The `index-protected.js` file is a default installation of `apollo` with [GraphQL Armor](https://github.com/Escape-Technologies/graphql-armor) except for the `maxDirectives` parameter for demo purposes.

Additionally, you can find queries to test the different protections in the `queries.yaml` file.

Finally if you do not have docker installed you can always try this out on <https://defcon-gqlarmor-demo.tools.escape.tech/default/graphql> and <https://defcon-gqlarmor-demo.tools.escape.tech/secure/graphql>.

## Tests Covered by this Demo

This demo API serves the purpose of showing how [GraphQL Armor](https://github.com/Escape-Technologies/graphql-armor) enforces restrictions preventing:

- Batched queries
- Field suggestions leaking the schema
- Queries too complex in terms of:
  - Depth
  - Aliases
  - Directives
- Stacktraces leaking (this is not strictly speaking enforced by apollo armor anymore, now that it is implemented by Apollo if `debug` is set to `false`)

## Making your own tests

Once you have modified the code, you are obliged to restart the container to see the behaviour of the app change. Nevertheless you can test all the different features provided by [GraphQL Armor](https://github.com/Escape-Technologies/graphql-armor). Do not hesitate to consult the [documentation](https://escape-technologies.github.io/graphql-armor) and open issues and contribute if you think of any way of upgrading [GraphQL Armor](https://github.com/Escape-Technologies/graphql-armor).
