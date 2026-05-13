package main

import (
	"os"
	"template/cmd/api/commands"
)

func main() {
	os.Exit(commands.Execute())
}