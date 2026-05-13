package model

type User struct {
	Id string `json:"id"`
	CreateAt string `json:"create_at",omitempty`
	UpdateAt string `json:"update_at",omitempty`
	DeleteAt string `json:"delete_at",omitempty`
	Email string `json:"email"`
	EmailVerified string `json:"email_verified",omitempty`
	LastLogin int64 `json:"last_login",omitempty`
	Firstname string `json:"first_name"`
	Lastname string `json:"last_name"`
	Nickname string `json:"nickname"`
	Locale string `json:"locale"`
	LastActivityAt int64 `json:"last_activity_at",omitempty`
	Password string `json:"password",omitempty`
	Username string `json:"username"`
}