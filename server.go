package main

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

func handle(w http.ResponseWriter, r *http.Request) {
	parts := strings.Split(r.URL.Path, "/")

	numStr := parts[2]
	num, err := strconv.Atoi(numStr)
	if err != nil {
		http.Error(w, "Invalid integer", http.StatusBadRequest)
		return
	}

	data := make([][][]int, num)
	for i := range data {
		data[i] = make([][]int, num)
		for j := range data[i] {
			data[i][j] = make([]int, num)
		}
	}

	for i := 0; i < num; i++ {
		for j := 0; j < num; j++ {
			for k := 0; k < num; k++ {
				data[i][j][k] = i + j + k
				if data[k][j][i] != 0 {
					copySlice := make([]int, len(data[i][j]))
					copy(copySlice, data[i][j])
					data[k][j] = copySlice
				}
			}
		}
	}

    // proof that it works
	// fmt.Println(data[num-1][num-1][num-1])

	fmt.Fprintf(w, "%d", num)
}

func main() {
	http.HandleFunc("/test/", handle)

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
