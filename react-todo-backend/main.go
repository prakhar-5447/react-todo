// Go package
package main

/// Go fmt import
import (
	"log"
	"net/http"

	"myapp/router"
)

// Go main function
func main() {

	// Init the mux router
	r := router.Router()

	log.Fatal(http.ListenAndServe(":8080", r))
}
