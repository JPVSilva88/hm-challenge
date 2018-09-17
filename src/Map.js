import React, {Component} from 'react';
import './Map.css';
import {connect} from 'react-redux';
import properties from './exerciseData_frontend.json';

const mapStateToProps = (state) => {
    return {
        selectedProperty: state.selectedProperty,
        coordinates: state.coordinates
    };
};

class Map extends Component {
    componentDidMount() {
        const {coordinates} = this.props;

        // Start up the map to the center of the service area
        this.map = new window.google.maps.Map(
            document.getElementById('map'),
            {
                zoom: 10,
                center: {lat: 51.5073835, lng: -0.1277801}
            }
        );

        // Add a circle to display the service area
        new window.google.maps.Circle({
            center: {lat: 51.5073835, lng: -0.1277801},
            radius: 20000,
            map: this.map,
            strokeColor: '#5DC4C5',
            fillColor: '#5DC4C5'
        });

        // Create markers for each property
        this.markers = {};

        properties.forEach(property => {
            const coordinate = coordinates[property.airbnbId];

            if(!coordinate) {
                return;
            }
            this.markers[property.airbnbId] = new window.google.maps.Marker({
                position: {lat: parseFloat(coordinate.lat), lng: parseFloat(coordinate.lng)},
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                map: this.map
            });
        });
    }

    shouldComponentUpdate(nextProps) {
        // Only update when selected property has changed
        return this.props.selectedProperty !== nextProps.selectedProperty;
    }

    componentDidUpdate(prevProps) {
        const {coordinates, selectedProperty} = this.props;

        // Update the icon of the selected property and pan the map to center on it
        if(selectedProperty) {
            this.map.panTo(coordinates[selectedProperty.airbnbId]);

            this.markers[selectedProperty.airbnbId].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        }

        // Update the icon of the previously selected property if any
        if(prevProps.selectedProperty) {
            this.markers[prevProps.selectedProperty.airbnbId].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        }
    }

    render() {
        return <div className="map" id="map"></div>
    }
}

export default connect(mapStateToProps)(Map);