package app

import (
	"template/public/model"

	"github.com/gorilla/mux"
)

type Routes struct {
	Root *mux.Router
	APIRoot *mux.Router

	Users *mux.Router // api/users
	User *mux.Router  // api/user

	RateLimit *mux.Router // api/rate-limit
}

type API struct {
	srv *Server
	BaseRoutes *Routes
}

func Init(srv *Server) (*API, error) {
	api := &API{
		srv: srv,
		BaseRoutes: &Routes{},
	}

	api.BaseRoutes.Root = srv.Router
	api.BaseRoutes.APIRoot = srv.Router.PathPrefix(model.APIURLSuffix).Subrouter()	

	api.BaseRoutes.User = api.BaseRoutes.APIRoot.PathPrefix("/user").Subrouter()
	api.BaseRoutes.Users = api.BaseRoutes.APIRoot.PathPrefix("/users").Subrouter()
	api.BaseRoutes.RateLimit = api.BaseRoutes.APIRoot.PathPrefix("/rate-limit").Subrouter()

	api.InitUser()

	return api, nil
}