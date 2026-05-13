package commands

import (
	"os"
	"runtime/debug"
	"template/internal/app"

	"github.com/spf13/cobra"
)

func NewServerGetCmd() *cobra.Command {
	c := &cobra.Command{
		Use: "server",
		RunE: func(cmd *cobra.Command, args []string) error {
			interruptChan := make(chan os.Signal, 1)

			return runServer(interruptChan)
		},
	}

	return c
}

func runServer(interruptChan chan os.Signal) error {
	debug.SetTraceback("crash")

	server, err := app.NewServer()

	if err != nil {
		return err
	}

	defer func () {
		if x := recover(); x != nil {
			// var buf bytes.Buffer
			panic(x)
		}
	}()

	app.Init(server)

	err = server.Start()
	if err != nil {
		return err
	}

	return nil
}