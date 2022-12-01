//get each star
let starRatings = [...document.querySelectorAll("#rating")];
let star1 = [...document.querySelectorAll("#star-1")];
let star2 = [...document.querySelectorAll("#star-2")];
let star3 = [...document.querySelectorAll("#star-3")];
let star4 = [...document.querySelectorAll("#star-4")];
let star5 = [...document.querySelectorAll("#star-5")];

//set star fill
let i = 0;
for(const starRating of starRatings) {
    const rating = starRating.innerHTML;
    console.log("rating: " + rating);
    if (rating < 1) {
        star2[i].style.color = "#f0f0f0";
        star3[i].style.color = "#f0f0f0";
        star4[i].style.color = "#f0f0f0";
        star5[i].style.color = "#f0f0f0";
    
        const decimal = (rating) * 100;
        star1[i].style.setProperty("--star-width", rating + "%");
        star2[i].style.setProperty("--star-width", "0%");
        star3[i].style.setProperty("--star-width", "0%");
        star4[i].style.setProperty("--star-width", "0%");
        star5[i].style.setProperty("--star-width", "0%");
    } else if (rating < 2) {
        star3[i].style.color = "#f0f0f0";
        star4[i].style.color = "#f0f0f0";
        star5[i].style.color = "#f0f0f0";
    
        const decimal = (rating - 1) * 100;
        star2[i].style.setProperty("--star-width", rating + "%");
        star3[i].style.setProperty("--star-width", "0%");
        star4[i].style.setProperty("--star-width", "0%");
        star5[i].style.setProperty("--star-width", "0%");
    } else if (rating < 3) {
        star4[i].style.color = "#f0f0f0";
        star5[i].style.color = "#f0f0f0";
    
        const decimal = (rating - 2) * 100;
        star3[i].style.setProperty("--star-width", rating + "%");
        star4[i].style.setProperty("--star-width", "0%");
        star5[i].style.setProperty("--star-width", "0%");
    } else if (rating < 4) {
        star5[i].style.color = "#f0f0f0";
    
        const decimal = (rating - 3) * 100;
        star4[i].style.setProperty("--star-width", rating + "%");
        star5[i].style.setProperty("--star-width", "0%");
    } else if (rating < 5) {
        const decimal = (rating - 4) * 100;
        star5[i].style.setProperty("--star-width", rating + "%");
    }

    i++
}