package commands

import (
	"fmt"

	"github.com/spf13/cobra"
)

func NewRootCmd() (cmd *cobra.Command) {
	cmd = &cobra.Command{
		Use: "template",
	}
	cmd.AddCommand(NewServerGetCmd())
	return cmd
}

func Execute() int {
	c := NewRootCmd()
	if err := c.Execute(); err != nil {
		fmt.Println(c.ErrOrStderr(), err)
		return 1
	}
	return 0;
}