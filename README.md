 ![Publish Github Package](https://github.com/letsfullstack/loopback-connector-postgresql/workflows/Publish%20Github%20Package/badge.svg)

# Loopback PostgreSQL Connector no projeto ArboBackend

Faça o NPM install desse projeto e copie a pasta para node_modules/@letscomunica/loopback-connector-postgresql ( substitua a página caso exita )

# Loopback PostgreSQL Connector

This loopback module is the PostgreSQL connector for the LoopBack framework. [PostgreSQL](https://www.postgresql.org/), is a popular open-source object-relational database.

For more information, see the [documentation](http://loopback.io/doc/en/lb3/PostgreSQL-connector.html).

**NOTE**: The PostgreSQL connector requires PostgreSQL 8.x or 9.x.

## Contributing

:boom: In case you are making a commit for this package repository, **MAKE SURE TO READ AND UNDERSTAND THE FOLLOWING TOPICS**:

1\. Every commit that runs on the [master branch](https://github.com/letsfullstack/loopback-connector-postgresql/tree/master) runs through the Publish Github Package Workflow on Github Actions. So **be sure to check if your code is well written and tested**, since it'll be published if the code passes the Continuous Integration (CI) unit tests.

2\. If the commit passes through the Github Actions workflow, the module will be released as a package in the Github Packages Registry. This workflow has an [underlying command](https://github.com/phips28/gh-action-bump-version) that **increments/bumps the version from the latest release based on commit messages**, such as:

- If the string "BREAKING CHANGE" or "major" is found anywhere in any of the commit messages or descriptions, the **major version** will be incremented (i.e. 1.X.X).

- If a commit message begins with the string "feat" or includes "minor" then the **minor version** will be increased (i.e. X.1.X). This works for most common commit metadata for feature additions: "feat: new API" and "feature: new API".

- All other changes will increment the **patch version** (i.e. X.X.1).

3\. Furthermore, the workflow has also an underlying command that deploys automatically a new release when a success test/deployment takes places. These releases can be found [here](https://github.com/letsfullstack/loopback-connector-postgresql/releases).

## Installation

In your application root directory, enter this command to install the connector:

```shell
$ npm install @letsfullstack/loopback-connector-postgresql
```

This installs the module from npm and adds it as a dependency to the application's `package.json` file.

If you create a PostgreSQL data source using the data source generator as described below, you don't have to do this, since the generator will run `npm install` for you.

## Usage

### Creating a data source

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a PostgreSQL data source to your application.  
The generator will prompt for the database server hostname, port, and other settings
required to connect to a PostgreSQL database.  It will also run the `npm install` command above for you.

The entry in the application's `/server/datasources.json` will look like this:

```javascript
"mydb": {
  "name": "mydb",
  "connector": "postgresql"
  "host": "mydbhost",
  "port": 5432,
  "url": "postgres://admin:admin@mydbhost:5432/db1?ssl=false",
  "database": "db1",
  "password": "admin",
  "user": "admin",
  "ssl": false
}
```

Edit `datasources.json` to add other properties that enable you to connect the data source to a PostgreSQL database.

### Connection Pool Settings

You can also specify connection pool settings in `datasources.json`. For instance you can specify the minimum and the maximum pool size, and the maximum pool client's idle time before closing the client.

Example of `datasource.json`:
```
{
  "mypostgresdb": {
    "host": "mydbhost",
    "port": 5432,
    "url": "postgres://admin:password1@mydbhost:5432/db1?ssl=false",
    "database": "db1",
    "password": "password1",
    "name": "mypostgresdb",
    "user": "admin",
    "connector": "postgresql",
    "min": 5,
    "max": 200,
    "idleTimeoutMillis": 60000,
    "ssl": false
  }
}
```
Check out [node-pg-pool](https://github.com/brianc/node-pg-pool) and [node postgres pooling example](https://github.com/brianc/node-postgres#pooling-example) for more information.

## Properties

| Property | Type | Description |
|---|---|---|
| connector | String | Connector name, either "loopback-connector-postgresql" or "postgresql" |
| database | String | Database name |
| debug | Boolean | If true, turn on verbose mode to debug database queries and lifecycle. |
| host | String | Database host name |
| password | String | Password to connect to database |
| port | Number | Database TCP port |
| url | String | Use instead of the host, port, user, password, and database properties. For example:'postgres://test:mypassword@localhost:5432/dev'. |
| username | String | Username to connect to database |
| min | Integer | Minimum number of clients in the connection pool |
| max | Integer | Maximum number of clients in the connection pool |
| idleTimeoutMillis | Integer | Maximum time a client in the pool has to stay idle before closing it |
| ssl | Boolean | Whether to try SSL/TLS to connect to server |

**NOTE**: By default, the 'public' schema is used for all tables.

The PostgreSQL connector uses [node-postgres](https://github.com/brianc/node-postgres) as the driver. For more
information about configuration parameters, see [node-postgres documentation](https://github.com/brianc/node-postgres/wiki/Client#constructors).

## Connecting to UNIX domain socket

A common PostgreSQL configuration is to connect to the UNIX domain socket `/var/run/postgresql/.s.PGSQL.5432` instead of using the TCP/IP port. For example:

```javascript
{
  "postgres": {
    "host": "/var/run/postgresql/",
    "port": "5432",
    "database": "dbname",
    "username": "dbuser",
    "password": "dbpassword",
    "name": "postgres",
    "debug": true,
    "connector": "postgresql"
  }
}
```

## Defining models

The model definition consists of the following properties.

| Property | Default | Description |
|---|---|---|
| name | Camel-case of the database table name | Name of the model. |
| options | N/A | Model level operations and mapping to PostgreSQL schema/table |
| properties | N/A | Property definitions, including mapping to PostgreSQL column |

For example:

```javascript
{
  "name": "Inventory",
  "options": {
    "idInjection": false,
    "postgresql": {
      "schema": "strongloop",
      "table": "inventory"
    }
  },
  "properties": {
    "id": {
      "type": "String",
      "required": false,
      "length": 64,
      "precision": null,
      "scale": null,
      "postgresql": {
        "columnName": "id",
        "dataType": "character varying",
        "dataLength": 64,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "NO"
      }
    },
    "productId": {
      "type": "String",
      "required": false,
      "length": 20,
      "precision": null,
      "scale": null,
      "id": 1,
      "postgresql": {
        "columnName": "product_id",
        "dataType": "character varying",
        "dataLength": 20,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "YES"
      }
    },
    "locationId": {
      "type": "String",
      "required": false,
      "length": 20,
      "precision": null,
      "scale": null,
      "id": 1,
      "postgresql": {
        "columnName": "location_id",
        "dataType": "character varying",
        "dataLength": 20,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "YES"
      }
    },
    "available": {
      "type": "Number",
      "required": false,
      "length": null,
      "precision": 32,
      "scale": 0,
      "postgresql": {
        "columnName": "available",
        "dataType": "integer",
        "dataLength": null,
        "dataPrecision": 32,
        "dataScale": 0,
        "nullable": "YES"
      }
    },
    "total": {
      "type": "Number",
      "required": false,
      "length": null,
      "precision": 32,
      "scale": 0,
      "postgresql": {
        "columnName": "total",
        "dataType": "integer",
        "dataLength": null,
        "dataPrecision": 32,
        "dataScale": 0,
        "nullable": "YES"
      }
    }
  }
}
```

## Type mapping

See [LoopBack types](http://loopback.io/doc/en/lb3/LoopBack-types.html) for details on LoopBack's data types.

### LoopBack to PostgreSQL types

| LoopBack Type | PostgreSQL Type |
|---|---|---|
| String/JSON/Text/Default | VARCHAR2 - Default length is 1024 |
| Number | INTEGER |
| Date | TIMESTAMP WITH TIME ZONE |
| Boolean | BOOLEAN |

### PostgreSQL types to LoopBack

| PostgreSQL Type | LoopBack Type |
|---|---|---|
| BOOLEAN | Boolean |
| VARCHAR/CHARACTER VARYING/CHARACTER/CHAR/TEXT | String |
| BYTEA | Node.js [Buffer object](http://nodejs.org/api/buffer.html) |
| SMALLINT/INTEGER/BIGINT/DECIMAL/NUMERIC/REAL/DOUBLE/SERIAL/BIGSERIAL | Number |
| DATE/TIMESTAMP/TIME | Date |
| POINT | [GeoPoint](http://apidocs.strongloop.com/loopback-datasource-juggler/#geopoint) |

### Numeric Data Type

**NOTE**: The [node.js driver for postgres](https://github.com/brianc/node-postgres) by default casts `Numeric` type as a string on `GET` operation. This is to avoid _data precision loss_ since `Numeric` types in postgres cannot be safely converted to JavaScript `Number`.

For details, see the corresponding [driver issue](https://github.com/brianc/node-pg-types/issues/28).

### Querying JSON fields

**NOTE**: The fields you are querying should be setup to use the JSON postgresql data type - see Defining models

Assuming a model such as this:

```json
{
  "name": "Customer",
  "properties": {
    "address": {
      "type": "object",
      "postgresql": {
        "dataType": "json"
      }
    }
  }
}
```

You can query the nested fields with dot notation:

```javascript
Customer.find({
  where: {
    'address.state': 'California'
  },
  order: 'address.city'
})
```

## Discovery and auto-migration

### Model discovery

The PostgreSQL connector supports _model discovery_ that enables you to create LoopBack models
based on an existing database schema using the unified [database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).  For more information on discovery, see [Discovering models from relational databases](https://loopback.io/doc/en/lb3/Discovering-models-from-relational-databases.html).

### Auto-migratiion

The PostgreSQL connector also supports _auto-migration_ that enables you to create a database schema
from LoopBack models using the [LoopBack automigrate method](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate).

For more information on auto-migration, see [Creating a database schema from models](https://loopback.io/doc/en/lb3/Creating-a-database-schema-from-models.html) for more information.

LoopBack PostgreSQL connector creates the following schema objects for a given
model: a table, for example, PRODUCT under the 'public' schema within the database.

The auto-migrate method:

* Defines a primary key for the properties whose `id` property is true (or a positive number).
* Creates a column with 'SERIAL' type if the `generated` property of the `id` property is true.

Destroying models may result in errors due to foreign key integrity. First delete any related models by calling delete on models with relationships.

## Running tests

### Own instance
If you have a local or remote PostgreSQL instance and would like to use that to run the test suite, use the following command:
- Linux
```bash
POSTGRESQL_HOST=<HOST> POSTGRESQL_PORT=<PORT> POSTGRESQL_USER=<USER> POSTGRESQL_PASSWORD=<PASSWORD> POSTGRESQL_DATABASE=<DATABASE> CI=true npm test
```
- Windows
```bash
SET POSTGRESQL_HOST=<HOST> SET POSTGRESQL_PORT=<PORT> SET POSTGRESQL_USER=<USER> SET POSTGRESQL_PASSWORD=<PASSWORD> SET POSTGRESQL_DATABASE=<DATABASE> SET CI=true npm test
```

### Docker
If you do not have a local PostgreSQL instance, you can also run the test suite with very minimal requirements.
- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn a PostgreSQL instance on your local:
```bash
source setup.sh <HOST> <PORT> <USER> <PASSWORD> <DATABASE>
```
where `<HOST>`, `<PORT>`, `<USER>`, `<PASSWORD>` and `<DATABASE>` are optional parameters. The default values are `localhost`, `5432`, `root`, `pass` and `testdb` respectively.
- Run the test:
```bash
npm test
```
