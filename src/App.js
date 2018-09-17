import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import properties from './exerciseData_frontend.json';
import Map from './Map.js';
import Table from './Table.js';
import actions from './actions/index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = (state) => {
    return {
        selectedProperty: state.selectedProperty,
        coordinates: state.coordinates
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectProperty: (owner) => {
            dispatch(actions.selectProperty(owner));
        },
        getCoordinates: (coordinates) => {
            dispatch(actions.getCoordinates(properties, coordinates));
        }
    };
};

export class App extends Component {
    componentDidMount() {
        this.props.getCoordinates && this.props.getCoordinates({});
    }

    render() {
        const intl = new Intl.NumberFormat('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        return (
            <div className="App">
                {!this.props.coordinates && <div className="busy-spinner">
                    <FontAwesomeIcon icon={faSpinner} spin size="3x"/>
                </div>}
                <div>
                    <Table
                        properties={properties}
                        coordinates={this.props.coordinates}
                        intl={intl}
                        selectProperty={this.props.selectProperty}
                    />
                </div>

                {this.props.coordinates && <Map/>}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);