var searchTerm = document.getElementById("search-term").innerHTML;

document.getElementById("apply-filters-button").onclick = () => {
    let minPrice = document.getElementById("min-price").value;
    let maxPrice = document.getElementById("max-price").value;
    let rating = document.getElementById("rating-filter").value;
    let beds = document.getElementById("beds-filter").value;
    let baths = document.getElementById("baths-filter").value;

    //check if values are good
    if(!minPrice) {
        console.log("price fail: "+minPrice);
        minPrice = "";
    } else {
        minPrice = "&min="+minPrice;
    }
    if(!maxPrice) {
        console.log("price fail");
        maxPrice = "";
    } else {
        maxPrice = "&max="+maxPrice;
    }
    if(maxPrice <= minPrice) {
        console.log("fail");
    }
    if(rating != "> 1"
            && rating != "> 2"
            && rating != "> 3"
            && rating != "> 4"
            && rating != "5") {
        console.log("fail rating: "+ rating);
        rating = "";
    } else {
        rating = "&rating="+rating;
    }
    if(beds != "1"
            && beds != "2"
            && beds != "3"
            && beds != "4"
            && beds != "> 4") {
        console.log("fail");
        beds = "";
    } else {
        beds = "&beds="+beds;
    }
    if(baths != "1"
            && baths != "2"
            && baths != "3"
            && baths != "4"
            && baths != "> 4") {
        console.log("fail");
        baths = "";
    } else {
        baths = "&baths="+baths;
    }

    let searchURL = `/listings/search?search=${searchTerm}${minPrice}${maxPrice}${rating}${beds}${baths}`;
    //searchURL = `/listings/search-test`;

    console.log(searchURL);

    location.replace(searchURL);
}

