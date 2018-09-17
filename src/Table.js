import React from 'react';
import './Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faQuestion, faTimes } from '@fortawesome/free-solid-svg-icons';

export const Table = ({coordinates, properties, intl, selectProperty}) => {
    return (<div className="table">
        <div className="table__header">
            <div className="table__name">Owner</div>
            <div className="table__address">Address</div>
            <div className="table__income">Income Generated</div>
            <div className="table__circle">In Service Area</div>
        </div>
        {
            properties && properties.map(property => {
                const coordinate = coordinates && coordinates[property.airbnbId];

                // Calculate which icon to display on the is within service area column
                const circleIcon = {};
                if(coordinate) {
                    if(coordinate.isWithin) {
                        circleIcon.icon = faCheck;
                        circleIcon.class = "yes";
                    } else {
                        circleIcon.icon = faTimes;
                        circleIcon.class = "no";
                    }
                } else {
                    circleIcon.icon = faQuestion;
                    circleIcon.class = "unknown";
                }

                return <div
                    key={property.airbnbId}
                    className="table__row"
                    onMouseEnter={() => selectProperty(property)}
                    onMouseLeave={() => selectProperty(null)}
                >
                    <div className="table__name">{property.owner}</div>
                    <div className="table__address">
                        <div>{property.address.line1}</div>
                        <div>{property.address.line2}</div>
                        <div>{property.address.line3}</div>
                        <div>{property.address.line4}</div>
                        <div>{property.address.postCode}</div>
                        <div>{property.address.city}</div>
                        <div>{property.address.country}</div>
                    </div>
                    <div className="table__income">{`${intl.format(property.incomeGenerated)}£`}</div>
                    <div className={`table__circle table__circle--${circleIcon.class}`}>
                        <div>
                            <FontAwesomeIcon icon={circleIcon.icon}/>
                        </div>
                    </div>
                </div>;
            })
        }
    </div>)
};

export default Table;