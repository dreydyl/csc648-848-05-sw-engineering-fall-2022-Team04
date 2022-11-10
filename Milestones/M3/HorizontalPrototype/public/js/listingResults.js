var searchTerm = document.getElementById("search-term").innerHTML;

function applyFilters() {
    let minPrice = document.getElementById("min-price").value;
    let maxPrice = document.getElementById("max-price").value;
    let rating = document.getElementById("rating-filter").value;
    let beds = document.getElementById("beds-filter").value;
    let baths = document.getElementById("baths-filter").value;

    //check if values are good
    // if(isNaN(minPrice) || isNaN(maxPrice)) { //check if number
    //     return false;
    // }
    // if(maxPrice <= minPrice) {
    //     return false;
    // }
    // if(rating != "> 1"
    //         || rating != "> 2"
    //         || rating != "> 3"
    //         || rating != "> 4"
    //         || rating != "5") {
    //     return false;
    // }
    // if(beds != "1"
    //         || beds != "2"
    //         || beds != "3"
    //         || beds != "4"
    //         || beds != "> 4") {
    //     return false;
    // }
    // if(baths != "1"
    //         || baths != "2"
    //         || baths != "3"
    //         || baths != "4"
    //         || baths != "> 4") {
    //     return false;
    // }

    let searchURL = `/listings/search?search=${searchTerm}&min=${minPrice}
                        &max=${maxPrice}&rating=${rating}&beds=${beds}&baths=${baths}`;
    //searchURL = `/listings/search-test`;

    console.log(searchURL);

    location.replace(searchURL);
}

