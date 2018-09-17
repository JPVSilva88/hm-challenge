import setCoordinates from './setCoordinates.js';

function action(properties, coordinates) {
    return function (dispatch) {
        // Create a google maps geocoder to get coordinates from an address
        const geocoder = new window.google.maps.Geocoder();

        // For every property create a promise to get the coordinates
        let promises = [];
        properties.forEach(property => {
            const {address, airbnbId} = property;

            // If the coordinates already exist, do not get them again
            if(coordinates[airbnbId]) {
                return;
            }

            promises.push(
                new Promise((resolve, reject) => {
                    geocoder.geocode({'address': `${address.line1} ${address.line2} ${address.line3} ${address.line4} ${address.postCode} ${address.country}`},
                        (results, status) => {
                            if (status === 'OK') {
                                resolve({
                                    id: airbnbId,
                                    coord: [results[0].geometry.location.lat(), results[0].geometry.location.lng()]});
                            } else {
                                reject(new Error('Geocode was not successful for the following reason: ' + status));
                            }
                        })
                })
            );
        });

        return Promise.all(promises)
            .then(res => {
                res.forEach((res) => {
                    coordinates[res.id] = {
                        lat: res.coord[0],
                        lng: res.coord[1]
                    };

                    // Calculate if it is within the service area or not
                    const ky = 40000 / 360;
                    const kx = Math.cos(Math.PI * 51.5073835 / 180.0) * ky;
                    const dx = Math.abs(-0.1277801 - parseFloat(res.coord[1])) * kx;
                    const dy = Math.abs(51.5073835 - parseFloat(res.coord[0])) * ky;
                    coordinates[res.id].isWithin = Math.sqrt(dx * dx + dy * dy) <= 20;

                });

                // Set the state of coordinates
                dispatch(setCoordinates(coordinates));
            });
    };
}

export default action;
