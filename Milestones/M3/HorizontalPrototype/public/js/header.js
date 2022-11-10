

let dropdown = document.getElementById("dropdown");
let listingsOption = document.getElementById("listings-option");
let landlordsOption = document.getElementById("landlords-option");
let dropdownButton = document.getElementById("dropdown-button");

let dropdownMenu = document.getElementById("dropdown-menu");
let listingsItem = document.getElementById("listings-item");
let landlordsItem = document.getElementById("landlords-item");

let searchText = document.getElementById("search-text");

let currentOption = "listings";
let menuOpen = false;

window.onclick = (event) => {
    if (event.target.contains(dropdown) && event.target !== dropdown) {
        menuOpen = false;
        dropdownMenu.style.display = "none";
        dropdownButton.style.clipPath = "polygon(100% 0%, 0 0%, 50% 100%)";
    }
}
dropdown.onclick = () => {
    if (menuOpen) {
        menuOpen = false;
        dropdownMenu.style.display = "none";
        dropdownButton.style.clipPath = "polygon(100% 0%, 0 0%, 50% 100%)";
    } else {
        menuOpen = true;
        dropdownMenu.style.display = "block";
        dropdownButton.style.clipPath = "polygon(100% 100%, 0 100%, 50% 0%)";
    }
};
listingsItem.onclick = () => {
    menuOpen = false;
    dropdownMenu.style.display = "none";
    dropdownButton.style.clipPath = "polygon(100% 0%, 0 0%, 50% 100%)";
    currentOption = "listings";
    landlordsOption.style.display = "none";
    listingsOption.style.display = "block";
    searchText.placeholder = "Enter an address or zip code..."
}
landlordsItem.onclick = () => {
    menuOpen = false;
    dropdownMenu.style.display = "none";
    dropdownButton.style.clipPath = "polygon(100% 0%, 0 0%, 50% 100%)";
    currentOption = "landlords";
    listingsOption.style.display = "none";
    landlordsOption.style.display = "block";
    searchText.placeholder = "Enter a name..."
}