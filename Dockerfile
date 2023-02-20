FROM debian:bookworm-slim AS dev
RUN apt-get update && \
    apt-get install -y protobuf-compiler curl nodejs npm
  
RUN npm install -g corepack nodemon && \
    corepack enable

# Download and install Go
ARG GO_VERSION=1.20
RUN curl -sSL "https://golang.org/dl/go${GO_VERSION}.linux-amd64.tar.gz" -o "go${GO_VERSION}.tar.gz" && \
    tar -C "/usr/local/" -xf "go${GO_VERSION}.tar.gz" && \
    mkdir -m 777 /go
ENV GOPATH="/go"
ENV PATH="/usr/local/go/bin:${GOPATH}/bin:${PATH}"

# Download and install Buf
RUN BIN="/usr/local/bin" && \
    VERSION="1.14.0" && \
    curl -sSL \
    "https://github.com/bufbuild/buf/releases/download/v${VERSION}/buf-$(uname -s)-$(uname -m)" \
    -o "${BIN}/buf" && \
    chmod +x "${BIN}/buf"
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2.0 && \
    go install github.com/bufbuild/connect-go/cmd/protoc-gen-connect-go@latest

WORKDIR /usr/src/app

################################
# Build backend
################################

FROM dev AS backend-builder

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
# COPY go.mod go.sum ./
WORKDIR /usr/src/app/backend
COPY ./backend/go.mod ./
RUN --mount=type=cache,mode=0777,target=/go/pkg/mod go mod download

COPY backend backend

# Use native go packages (CGO_ENABLED)
RUN --mount=type=cache,mode=0777,target=/go/pkg/mod \
    --mount=type=cache,mode=0777,target=/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux go build -o serve ./backend/cmd/main.go

################################
# Run backend
################################

FROM scratch AS backend
WORKDIR / 
COPY --from=backend-builder /usr/src/app/backend ./
ENTRYPOINT ["/serve"]