export class ConfigOptions {
    vertaAIImages = {
        ModelDBBackEnd: 'vertaaiofficial/modeldb-backend:latest',
        ModelDBFrontend: 'vertaaiofficial/modeldb-frontend:latest',
        ModelDBProxy: 'vertaaiofficial/modeldb-proxy:latest'
    }
    userData = `
#!/bin/bash
mkdir -p /ecs/backend/config/
cat << EOF > /ecs/backend/config/config.yaml 
#This config is used by docker compose.
#ModelDB Properties
grpcServer:
    port: 8085

springServer:
    port: 8086
    shutdownTimeout: 30 #time in second

artifactStoreConfig:
    artifactStoreType: NFS #S3, GCP, NFS
    NFS:
    nfsUrlProtocol: http
    nfsRootPath: /artifact-store/
    artifactEndpoint:
        getArtifact: "api/v1/artifact/getArtifact"
        storeArtifact: "api/v1/artifact/storeArtifact"

# Database settings (type mongodb, couchbasedb, relational etc..)
database:
    DBType: relational
    timeout: 4
    liquibaseLockThreshold: 60 #time in second
    RdbConfiguration:
    RdbDatabaseName: postgres
    RdbDriver: "org.postgresql.Driver"
    RdbDialect: "org.hibernate.dialect.PostgreSQLDialect"
    RdbUrl: "#{modelDBRDSInstanceUrl}"
    RdbUsername: "#{myProdRDSUsername}"
    RdbPassword: "#{myProdRDSPassword}"

# Test Database settings (type mongodb, couchbasedb etc..)
test:
    test-database:
    DBType: relational
    timeout: 4
    liquibaseLockThreshold: 60 #time in second
    RdbConfiguration:
        RdbDatabaseName: postgres
        RdbDriver: "org.postgresql.Driver"
        RdbDialect: "org.hibernate.dialect.PostgreSQLDialect"
        RdbUrl: "jdbc:postgresql://modeldb-postgres:5432"
        RdbUsername: postgres
        RdbPassword: root

#ArtifactStore Properties
artifactStore_grpcServer:
    host: modeldb-backend
    port: 8086

telemetry:
    opt_in: true
    frequency: 1 #frequency to share data in hours, default 1
    consumer: https://app.verta.ai/api/v1/uac-proxy/telemetry/collectTelemetry
EOF     
`
}