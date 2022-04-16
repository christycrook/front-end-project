const submitButton = document.querySelector('#btn2');
submitButton.addEventListener('click', function() {
    onSearch();
    loadCards(restaurants);
})

async function onSearch (e) {
    e.preventDefault();

    const output = document.querySelector('#output');
    output.empty();
    
    let city = document.querySelector('#city');
    let state = document.querySelector('#state');
    let zipcode = document.querySelector('#zipcode');

    const allRestaurants = await mealMeSearch(city, state, zipcode);

    loadCards(allRestaurants);
}

function loadCards(restaurants) {
    const output = document.querySelector('#output');

    restaurants.map(function () {
        output.append(
            `  
            <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 " align="center">
              <div class="row">
                <div class="col-md-6">
                  <img src="${restaurants.logo}" width="100%" height="280px" alt="...">
                </div>
                <div class="col-md-6 d-flex align-items-center">
                  <div class="card-body">
                    <h5 class="card-title">${restaurants.restaurant}</h5>
                    <p class="card-text"><i class='fa fa-map-marker'></i>${restaurants.address}</p>
                  </div>
                </div>
              </div>
            </div>
        `
        );
    });
};

async function mealMeSearch(city, state, zipcode) {
    let citySearch = city;
    let stateSearch = state;
    let zipcodeSearch = zipcode;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'mealme.p.rapidapi.com',
            'X-RapidAPI-Key': '0f9d7c20damsheeb55f0bb40c805p1f5a07jsn9c8dae1fc40a'
        }
    };

    const response = await fetch(
        `https://mealme.p.rapidapi.com/restaurants/search/store?latitude=29.7604&longitude=-95.3698&${citySearch}&${stateSearch}&${zipcodeSearch}`, options
    );
    
    const data = await response.json();
    console.log(data);
    let restaurants = data.restaurants;

    let output = restaurants.map(({ name, address, logo_photos }, index) => {
        return {
            restaurant: data.restaurants[index].name,
            logo: `${logo_photos}`,
            address: `${address.street_addr}, ${address.city}, ${address.state}, ${address.zipcode}`,
        }
    })
    console.log(output);
    return output;
};
mealMeSearch();
