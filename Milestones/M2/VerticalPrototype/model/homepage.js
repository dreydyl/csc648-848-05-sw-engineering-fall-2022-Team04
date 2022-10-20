window.onload = function () {

    let searchButton = document.getElementById("search-button");

    function createCard(data) {
        return `<div class="listing-container">
    <img class="listing-img"
        src="./images/picture_1666042712023.jpeg">
    <di class="listing-container-profile">
        <div class="listing-card-profile-section">
            <img class="listing-card-profile-img"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
        </div>
        <div class="listing-container-profile-text">
            <p class="listing-card-price">$${data.price}</p>
            <p class="listing-card-city"><b>${data.city}</b></p>
        </div>
    </di>
</div>`;
    }

    function searchResults(newContent) {
        return `<div id="search_results_main">
    <div id="search_results_filters">
    <h1>
    Search Filters
</h1>

<div class="filters">
    <select class="select">
    <option disabled selected>Price</option>
    <option value="< $1000">< $1000</option>
    <option value="< $2000">< $2000</option>
    <option value="< $3000">< $3000</option>
    <option value="< $4000">< $4000</option>
    <option value="< $5000">< $5000</option>
    <option value="> $5000">> $5000</option>
</select>

<select class="select">
    <option disabled selected>Rating</option>
    <option value="> 2">> 2</option>
    <option value="> 3">> 3</option>
    <option value="> 4">> 4</option>
    <option value="5">5</option>
</select>

<select class="select">
    <option disabled selected>Beds</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="> 4">> 4</option>
</select>

<select class="select">
    <option disabled selected>Baths</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="> 4">> 4</option>
</select>
</div>
    <input type="button" value="Apply" id="apply-filters-button" />
    </div>
    <div id="search_results_card_section">
        <h1>Search Results</h1>
        <div id="search_results_cards">
            ${newContent}
        </div>
    </div>
</div>`;
    }

    function executeSearch() {
        let searchTerm = document.getElementById("search-text").value;
        if (!searchTerm) {
            location.replace('/');
            return;
        }
        let mainContent = document.getElementById("main-content");
        let newContent = '';
        let newMainContent = '';
        let searchURL = `/listing/${searchTerm}`;
        fetch(`http://localhost:8080${searchURL}`)
            .then(res => res.json())
            .then(data => {
                let temp = data.listing;
                console.log(temp);
                for (const temp1 in temp) {
                    newContent += createCard(temp[temp1]);
                }
                newMainContent += searchResults(newContent);
                mainContent.innerHTML = newMainContent;
            })
            .catch(err => {
                console.log('Data not found in database.');
            })
    }
    //console.log(searchButton);

    searchButton.onclick = executeSearch;
}