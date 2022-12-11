document.getElementById("leave-review-button").onclick = () => {
    document.getElementById("myForm").style.display = "block";
}

document.getElementById("edit-profile-button").onclick = () => {
    document.getElementById("myForm").style.display = "block";
}

let sendReviewButton = document.getElementById("post-review-submit-button");
sendReviewButton.onclick = () => {
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