// Delivery.js

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateDeliveryAddress, fetchDeliveryAddresses} from '../../redux/slices/checkoutSlice';
import styles from './Delivery.module.css';

const Delivery = () => {
    const dispatch = useDispatch();
    const deliveryAddresses = useSelector(state => state.checkout.deliveryAddresses);
    const [expanded, setExpanded] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedCity, setSelectedCity] = useState({});

    useEffect(() => {
        dispatch(fetchDeliveryAddresses());
    }, [dispatch]);

    const handleCountryChange = (event) => {
        const newCountry = deliveryAddresses.find(country => country.id === event.target.value);
        setSelectedCountry(newCountry);
        setSelectedState({});
        setSelectedCity({});
        dispatch(updateDeliveryAddress({}));
    };

    const handleStateChange = (event) => {
        const state = selectedCountry.states.find(state => {
            return state.state === event.target.value
        });
        setSelectedState(state);
        setSelectedCity({});
        dispatch(updateDeliveryAddress({}));
    };

    const handleCityChange = (event) => {
        const newCity = selectedState.cities.find(city => city === event.target.value);
        setSelectedCity({city: newCity});
        dispatch(updateDeliveryAddress(newCity));
    };

    return (
        <div className={styles.delivery}>
            <h2>Delivery</h2>
            {expanded ? (
                <div className={styles.addressForm}>
                    <div className={styles.selectWrapper}>
                    <select value={selectedCountry.id || ''} onChange={handleCountryChange}>
                        <option value=''>Select country...</option>
                        {deliveryAddresses.map(country => (
                            <option value={country.id}>{country.country}</option>
                        ))}
                    </select>
                    </div>
                    {selectedCountry.states && (
                        <div className={styles.selectWrapper}>
                        <select value={selectedState.state || ''} onChange={handleStateChange}>
                            <option value=''>Select state...</option>
                            {selectedCountry.states.map(state => (
                                <option value={state.state}>{state.state}</option>
                            ))}
                        </select>
                        </div>
                    )}
                    {selectedState.cities && (
                        <div className={styles.selectWrapper}>
                        <select value={selectedCity.city} onChange={handleCityChange}>
                            <option value=''>Select city...</option>
                            {selectedState.cities.map(city => (
                                <option value={city}>{city}</option>
                            ))}
                        </select>
                        </div>
                    )}
                    <button className={styles.deliveryButton} onClick={() => setExpanded(false)}>Save</button>
                </div>
            ) : (
                <div className={styles.selectedAddress}>
                    {(selectedCity.city && selectedState.state && selectedCountry.country) ?
                        <p>{selectedCity.city}, {selectedState.state}, {selectedCountry.country}</p>
                        : <p>Please Select your Address</p>
                    }
                    <button className={styles.deliveryButton}
                        onClick={() => setExpanded(true)}>{(selectedCity.city && selectedState.state && selectedCountry.country) ? "Change" : "Select"}</button>
                </div>
            )}
        </div>
    )
}


export default Delivery;
