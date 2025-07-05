# Build stage
FROM golang:1.24-alpine AS builder
WORKDIR /app

# Copy only go.mod and go.sum (if available) for dependency caching
COPY go.mod go.sum* ./

# Copy the rest of the source code
COPY . .

# Build the Go binary (statically linked for scratch compatibility)
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /app/girus-backend .

# Final stage (ultra-lightweight)
FROM scratch
COPY --from=builder /app/girus-backend /girus-backend

# Optional: Add CA certificates if your app makes HTTPS calls
# COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

CMD ["/girus-backend"]