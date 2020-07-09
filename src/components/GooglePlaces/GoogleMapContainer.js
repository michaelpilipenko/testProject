import React, {useState, useCallback} from 'react';
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import PropTypes from 'prop-types';


const MapContainer = ({google, addPlaceInfo}) => {
    const [markers, setMarkers] = useState([]);

    const [mapProps, setMapProps] = useState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: {}
    });

    const MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';

    const onMapClicked = (props) => {
        if (mapProps.showingInfoWindow) {
            setMapProps({
                ...mapProps,
                showingInfoWindow: false,
                activeMarker: null
            })

        }
    };

    const renderAutoComplete = useCallback((mapProp, map) => {
        const input = document.querySelector('#autocomplete')
        const autocomplete = new google.maps.places.Autocomplete(input,{
            types: ['(cities)'],
            componentRestrictions: {'country': 'ua'}
        });
        autocomplete.bindTo('bounds', map);
        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name']);

        const places = new google.maps.places.PlacesService(map)

        function onPlaceChanged() {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                map.panTo(place.geometry.location);
                map.setZoom(15);
                search();
            } else {
                input.placeholder = 'Enter a city';
            }
        }

        function search() {
            let search = {
                bounds: map.getBounds(),
                types: ['lodging']
            };

            places.nearbySearch(search, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        let markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                        let markerIcon = MARKER_PATH + markerLetter + '.png';
                        markers[i] = new google.maps.Marker({
                            position: results[i].geometry.location,
                            animation: google.maps.Animation.DROP,
                            icon: markerIcon
                        });
                        markers[i].placeResult = results[i];
                        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                        setTimeout(dropMarker(i), i * 100);
                    }
                }
            });
        }

        function dropMarker(i) {
            return function() {
                markers[i].setMap(map);
            };
        }

        function showInfoWindow() {
            let marker = this;
            places.getDetails({placeId: marker.placeResult.place_id},
                function(place, status) {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        return;
                    }

                    setMarkers(marker);
                    buildIWContent(place);
                });
        }

        function buildIWContent(place) {

            let ratingHtml = '';
            for (let i = 0; i < 5; i++) {
                if (place.rating < (i + 0.5)) {
                    ratingHtml += '✩';
                } else {
                    ratingHtml += '✭';
                }
            }

            mapProps.selectedPlace = {
                name: place.name,
                url: place.icon,
                address: place.vicinity,
                phone: place.formatted_phone_number ?? '',
                rating: ratingHtml ?? '',
            }
            mapProps.showingInfoWindow = true;
            setMapProps({...mapProps})
            addPlaceInfo(mapProps.selectedPlace)
        }

        google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
    },[mapProps])

    return (
        <Map google={google}
             onClick={onMapClicked}
             mapTypeControl={false}
             panControl={false}
             zoomControl={false}
             streetViewControl={false}
             zoom={6}
             initialCenter={{
                 lat: 50.4536063,
                 lng: 30.61130044
             }}
             containerStyle={{
                 height: '90vh',
                 position: 'relative',
                 width: '100%'
             }}
             centerAroundCurrentLocation={false}
             onReady={renderAutoComplete}
        >
                <InfoWindow  style={{height:50, width: 50}} google={google} visible={mapProps.showingInfoWindow} marker={markers}>
                    <div id="info-content">
                        <img src={mapProps.selectedPlace.url} width="20" height="20" alt={mapProps.selectedPlace.name}/>
                        <span>{mapProps.selectedPlace.name}</span><br/>
                        <span>Phone: {mapProps.selectedPlace.phone}</span><br/>
                        <span>Address: {mapProps.selectedPlace.address}</span><br/>
                        <span>Rating: {mapProps.selectedPlace.rating}</span><br/>
                    </div>
                </InfoWindow>
        </Map>
    );
};

MapContainer.propTypes = {
    google: PropTypes.object.isRequired,
    addPlaceInfo: PropTypes.func.isRequired
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA5OOCL4A2R0niLNlVp1naJpPqshNUGpcs',
    libraries: ['places'],
})(MapContainer)