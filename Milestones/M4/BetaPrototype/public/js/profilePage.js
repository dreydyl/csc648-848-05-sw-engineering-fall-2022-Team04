document.getElementById("post-review-button").onclick = () => {
    document.getElementById("myForm").style.display = "block";
}

document.getElementById("post-review-submit-button").onclick = () => {
    document.getElementById("textarea").value = "";
    document.getElementById("myForm").style.display = "none";
}

document.getElementById("profile-page-listings").onclick = () => {
    location.replace("/listingpage");
}

// function openForm() {
//     document.getElementById("myForm").style.display = "block";
// }

// function closeForm() {
//     document.getElementById("textarea").value = "";
//     document.getElementById("myForm").style.display = "none";
// }