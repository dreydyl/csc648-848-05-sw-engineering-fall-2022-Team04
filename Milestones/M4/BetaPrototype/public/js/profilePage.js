document.getElementById("post-review-button").onclick = () => {
    document.getElementById("myForm").style.display = "block";
}

document.getElementById("post-review-submit-button").onclick = () => {
    document.getElementById("textarea").value = "";
    document.getElementById("myForm").style.display = "none";
}

let listings = [...document.querySelectorAll("#profile-page-listings")];
for(var listing of listings) {
    listing.onclick = () => { //TODO get id of listing
        location.replace("/listingpage");
    }
}

// function openForm() {
//     document.getElementById("myForm").style.display = "block";
// }

// function closeForm() {
//     document.getElementById("textarea").value = "";
//     document.getElementById("myForm").style.display = "none";
// }