document.getElementById("landlord-info").onclick = () => {
    location.replace("/profilepage")
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("textarea").value = "";
    document.getElementById("myForm").style.display = "none";
}
document.getElementById("profile-page-listings").onclick = () => {
    location.replace("/listingpage");
}