package auth

import (
	"context"
	"errors"

	"github.com/bufbuild/connect-go"
)

const tokenHeader = "Acme-Token"

func NewAuthInterceptor() connect.UnaryInterceptorFunc {
  interceptor := func(next connect.UnaryFunc) connect.UnaryFunc {
    return connect.UnaryFunc(func(
      ctx context.Context,
      req connect.AnyRequest,
    ) (connect.AnyResponse, error) {
      if req.Spec().IsClient {
        // Send a token with client requests.
        req.Header().Set(tokenHeader, "sample")
      } else if req.Header().Get(tokenHeader) == "" {
        // Check token in handlers.
        return nil, connect.NewError(
          connect.CodeUnauthenticated,
          errors.New("no token provided"),
        )
      }
      return next(ctx, req)
    })
  }
  return connect.UnaryInterceptorFunc(interceptor)
}