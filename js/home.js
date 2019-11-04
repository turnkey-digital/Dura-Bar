// Wait till foundation has loaded
$(document).foundation();


// -------------- \\
// Check if device has Geolocation
("geolocation" in navigator ? geoLocation() : null)


// -------------- \\
// Set variables needed for all functions

// Create JSON for set of all locations
let latAndLon = {
    0: {
        "lat": 42.289313,
        "lon": -88.413269,
        "name": "Woodstock",
        "address": "Woodstock, Illinois 2195 W.Lake Shore Drive",
        "phone": "888.387.2227",
        "fax": "815.338.4608",
        "desc": "Conveniently located 50 miles northwest of Chicago, this location carries a large inventory of Dura-Bar and Bronze material in rounds, rectangles, squares and tubes available for as soon as same day shipment. Services include cutting, drilling, milling and turning.",
        "url": "nearest-location.jpg"
    },
    1: {
        "lat": 35.631888,
        "lon": -80.531930,
        "name": "Carolina",
        "address": "770 Cedar Springs Road Salisbury, North Carolina 28147",
        "phone": "888.387.2227",
        "fax": "704.637.9736",
        "desc": "Salisbury is a city in the Piedmont region of North Carolina; it has been the county seat of Rowan County since 1753 when Rowan County was much larger and its territory extended to the Mississippi",
        "url": "nc.jpeg"
    },
    2: {
        "lat": 40.041201,
        "lon": -76.738538,
        "name": "Pennsylvania",
        "address": "90 Grumbacher Road York, Pennsylvania 17404",
        "phone": "888.387.2227",
        "fax": "973.589.3645",
        "desc": "York is a city in southern Pennsylvania. Downtown, the Historical Society Museum displays fine art, furniture and tall-case clocks. Nearby is the Victorian-era Bonham House. The Agricultural and Industrial Museum explores the city’s farming and manufacturing past. The Colonial Complex includes a mid-1700s home, a courthouse and the Golden Plough Tavern. The area’s vineyards are part of the Mason-Dixon Wine Trail.",
        "url": "pennsylvania.jpeg"
    },
    3: {
        "lat": 32.793156,
        "lon": -97.248036,
        "name": "Texas",
        "address": "2320 Pecan Court Fort Worth, Texas 76117-5336",
        "phone": "817.831.6306",
        "fax": "817.831.7220",
        "desc": "Fort Worth is a city in North Central Texas. In the late 19th century, it became an important trading post for cowboys at the end of the Chisholm Trail. Today, it's a modern city, with international art institutions like the Kimbell Art Museum. The Fort Worth Stockyards are home to rodeos, and the National Cowgirl Museum and Hall of Fame honors pioneers.",
        "url": "texas.jpeg"
    }
};

var areYouInTheUSA = true;

let distances = [null, null, null, null]


// All Functions
function geoLocation() {
    navigator.geolocation.getCurrentPosition(position);
};

function position(position) {
    let lat1 = position.coords.latitude;
    let lon1 = position.coords.longitude;
    console.table(position);

    checkCountry(lat1, lon1, areYouInTheUSA);

}

function inUSA(lat1, lon1) {

    for (i = 0; i < Object.keys(latAndLon).length; i++) {
        var thisLat = latAndLon[i].lat;
        var thisLon = latAndLon[i].lon;

        var totalDistance = distance(lat1, lon1, thisLat, thisLon, "M");

        distances[i] = {
            "name": latAndLon[i].name,
            "distance": totalDistance,
            "address": latAndLon[i].address,
            "phone": latAndLon[i].phone,
            "fax": latAndLon[i].fax,
            "desc": latAndLon[i].desc,
            "url": latAndLon[i].url
        };
    }


    var currentOption = {
        "name": "Woodstock",
        "distance": 500,
        "address": "Woodstock, Illinois 2195 W.Lake Shore Drive",
        "phone": "888.387.2227",
        "fax": "815.338.4608",
        "desc": "Conveniently located 50 miles northwest of Chicago, this location carries a large inventory of Dura-Bar and Bronze material in rounds, rectangles, squares and tubes available for as soon as same day shipment. Services include cutting, drilling, milling and turning.",
        "url": "nearest-location.jpg"
    }

    for (i = 0; i < Object.keys(distances).length; i++) {
        (currentOption.distance > distances[i].distance ? updateCurrentOption(distances[i]) : null)

        function updateCurrentOption(update) {
            currentOption = {
                "name": update.name,
                "distance": update.distance,
                "address": update.address,
                "phone": update.phone,
                "fax": update.fax,
                "desc": update.desc,
                "url": update.url
            }
        }
    }

    console.table(currentOption);

}


function checkCountry(lat, lon, bool) {
    fetch(`http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${lon}&username=tkd_jon`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            (data.countryCode == 'US' ? bool = !bool : console.log('swine!'));
            (bool ? console.log('You have either denied the browser permissions to access your location. Or you are outside of the United States of America') : inUSA(lat, lon));
        })
        .catch(err => {
            // Do something for an error here
            console.log('There was an error trying to validate your location')
        })
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }

    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        return dist;
    }
}
