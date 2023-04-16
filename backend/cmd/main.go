package main

import (
	"fmt"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/jwt"
)

func main() {
	// serve.Server()
	token, error := jwt.GenerateJWT("lars@test.com", "larsTest")

	if (error != nil) {
		fmt.Println(error)
	}

	email, username, error := jwt.ValidateToken(token)

	fmt.Println("token")

	if (error != nil) {
		fmt.Println(error)
	} else {
		fmt.Println(email)
		fmt.Println(username)
	}
}
