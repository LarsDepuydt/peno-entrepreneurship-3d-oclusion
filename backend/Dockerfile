FROM golang:1.20 AS builder

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
# COPY go.mod go.sum ./
COPY go.mod ./
RUN go mod download

COPY . .
# Use native go packages (CGO_ENABLED)
RUN CGO_ENABLED=0 go build -v -o serve ./cmd/serve/main.go

FROM scratch
WORKDIR / 
COPY --from=builder /usr/src/app ./
ENTRYPOINT ["/serve"]