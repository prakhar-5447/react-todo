package middleware

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"context"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	// "go.mongodb.org/mongo-driver/mongo/readpref"

	"myapp/models"
)

var collection *mongo.Collection

func init() {
	loadTheEnv()
	createDBInstance()
}

func loadTheEnv() {
	err := godotenv.Load(".env")
	ErrorHandle(err)
}

func createDBInstance() {
	connectionString := os.Getenv("DB_URI")
	dbName := os.Getenv("DB_NAME")
	collName := os.Getenv("DB_COLLECTION_NAME")

	clientOption := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.Background(), clientOption)
	ErrorHandle(err)

	err = client.Ping(context.Background(), nil)
	ErrorHandle(err)

	fmt.Println("Connect to MongoDB")

	collection = client.Database(dbName).Collection(collName)
	_ = collection
	fmt.Println("Collection Instance Created", collection)

}

// CRUD Operations
func InsertStudent(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Successfully Request for Inserting")
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var student models.Student

	// get request data
	json.NewDecoder(r.Body).Decode(&student)
	fmt.Println(student)
	result, err := collection.InsertOne(context.Background(), student)
	_ = result
	ErrorHandle(err)
	fmt.Println("Details Successfully Registered")

	// send response data
	json.NewEncoder(w).Encode(student)
}

func GetStudent(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Successfully Request for Retrieving")
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Find one collection
	var student []bson.M
	// if result,err := collection.Find(context.Background(), bson.M{}); err != nil {
	// 	log.Fatal(result,err)
	// }
	// fmt.Println(student)

	// Find all collection
	result, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	defer result.Close(context.Background())
	for result.Next(context.Background()) {
		var data bson.M
		if err = result.Decode(&data); err != nil {
			log.Fatal(err)
		}
		student = append(student, data)
	}

	// send response data
	json.NewEncoder(w).Encode(student)

}

func DeleteStudent(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Successfully Request")
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var student bson.M

	// get request data
	json.NewDecoder(r.Body).Decode(&student)

	// Find one collection
	result := collection.FindOneAndDelete(context.Background(), student)
	_ = result

	// send response data
	json.NewEncoder(w).Encode("Successfully deleted")

}

func UpdateStudent(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Successfully Request for Updating")
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var student models.Student
	json.NewDecoder(r.Body).Decode(&student)

	filter := bson.M{"rollno": student.Rollno}
	// get request data


	update := bson.M{
        "$set": student,
    }


	// Find one collection
	result, err := collection.UpdateOne(context.Background(), filter, update)
	_ = result
	ErrorHandle(err)

	// send response data
	json.NewEncoder(w).Encode("Successfully updated")

}

func ErrorHandle(err error) {
	if err != nil {
		log.Fatal("connection error", err)
	}
}
