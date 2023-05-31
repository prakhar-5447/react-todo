package router

import (
	"log"

	"github.com/gorilla/mux"

	"myapp/middleware"
)

func Router() *mux.Router {
	// Init the mux router
	router := mux.NewRouter()

	// Route handles & endpoints

	// Get request
	router.HandleFunc("/put", middleware.InsertStudent).Methods("POST","OPTIONS")
	router.HandleFunc("/get", middleware.GetStudent).Methods("GET","OPTIONS")
	router.HandleFunc("/delete", middleware.DeleteStudent).Methods("DELETE","OPTIONS")
	router.HandleFunc("/update", middleware.UpdateStudent).Methods("PUT","OPTIONS")

	// serve the app
	log.Println("Server started")
	return router
}

func ErrorHandle(err error) {
	if err != nil {
		log.Fatal("router error",err)
	}
}
