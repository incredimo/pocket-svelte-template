FROM golang:1.22-alpine AS builder
WORKDIR /build
COPY server/go.mod server/go.sum server/main.go ./
COPY server/hooks ./hooks
COPY server/auditlog ./auditlog
RUN apk --no-cache add upx make git gcc libtool musl-dev ca-certificates dumb-init \
  && go mod tidy \
  && CGO_ENABLED=0 go build \
  && upx pocketbase

FROM alpine
WORKDIR /app/server
COPY --from=builder /build/pocketbase /app/server/pocketbase
# COPY server/server_data ./server_data #not needed
COPY server/server_hooks ./server_hooks
COPY web/build ./server_public
COPY server/server_migrations ./server_migrations
COPY server/data ./data
# these are the volumes you could mount to your own dirs
VOLUME server_data server_public server_migrations server_hooks data
CMD ["/app/server/pocketbase","serve", "--http", "0.0.0.0:8090"]