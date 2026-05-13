package app

import (
	"fmt"
	"net"
	"net/http"

	"github.com/gorilla/mux"
)

type Server struct {
	Server *http.Server
	Router *mux.Router
	ListenAddr *net.TCPAddr
	outgoingWebhookClient *http.Client
}

// func NewServer(config *model.Config) (*Server, error) {
func NewServer() (*Server, error) {
	rootRouter := mux.NewRouter()

	s := &Server{
		Router: rootRouter,
	}

	return s, nil
}

func (s *Server) Start() error {
	var handler http.Handler = s.Router

	addr := ":8090"

	s.Server = &http.Server{
		Handler: handler,
		Addr: addr,
	}
	fmt.Printf("Server running on http://localhost%s\n", addr)
	err := s.Server.ListenAndServe();
	return err
}