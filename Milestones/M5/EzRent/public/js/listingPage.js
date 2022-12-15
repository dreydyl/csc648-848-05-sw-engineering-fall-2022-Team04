let landlordId = document.getElementById("landlord-id").innerHTML;

document.getElementById("landlord-info").onclick = () => {
    location.assign(`/users/profilePage/${landlordId}`)
}

document.getElementById("leave-review-button").onclick = () => {
    document.getElementById("myForm").style.display = "block";
}