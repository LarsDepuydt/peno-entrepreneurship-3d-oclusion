package jwt

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("supersecretkey")

func GenerateJWT(email string, username string) (tokenString string, err error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": jwt.NewNumericDate(time.Now().Add(time.Hour)),
		"authorized": true,
		"username": username,
		"email": email,
	})

	tokenString, err = token.SignedString(jwtKey)
	if err != nil {
    return "", err
 }

 return tokenString, nil
}

func ValidateToken(tokenString string) (email string, username string, err error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
	
		return jwtKey, nil
	})

	
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		email, ok1 := claims["email"].(string)
		username, ok2 :=  claims["username"].(string)

		if ok1 && ok2 {
			return email, username, nil
		}
	}
		
	return "", "", err
}
