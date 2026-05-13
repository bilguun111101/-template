package app

import (
	"net/http"
)

func (api *API) InitUser() {
	// api.BaseRoutes.Users.Handle("", createUser).Methods(http.MethodPost)
	
}

func createUser(w http.ResponseWriter, r *http.Request) {
	// var user model.User
	// if jsonErr := json.NewDecoder(r.Body).Decode(&user)
}