# syntax=docker/dockerfile:1

# Pinned PocketBase version so the migration API stays compatible with the
# migrations in pb_migrations/. Bump deliberately, testing migrations first.
FROM alpine:3.20 AS build
ARG PB_VERSION=0.22.21
# TARGETARCH is provided by BuildKit: "amd64" or "arm64".
ARG TARGETARCH
RUN apk add --no-cache unzip ca-certificates wget \
 && wget -O /tmp/pb.zip \
      "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${TARGETARCH}.zip" \
 && unzip /tmp/pb.zip -d /pb \
 && rm /tmp/pb.zip

FROM alpine:3.20
RUN apk add --no-cache ca-certificates
WORKDIR /pb
COPY --from=build /pb/pocketbase /pb/pocketbase
# Migrations are baked into the image so the schema is reproducible on any host.
COPY pb_migrations /pb/pb_migrations

EXPOSE 8090
# pb_data is a mounted volume (persisted), pb_migrations ships in the image.
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb/pb_data", "--migrationsDir=/pb/pb_migrations"]
