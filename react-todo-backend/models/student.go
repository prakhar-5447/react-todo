package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Student struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name   string             `json:"name,omitempty"`
	Age    string             `json:"age,omitempty"`
	Rollno string             `json:"rollno,omitempty"`
}
