// Delivery.js

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateDeliveryAddress, fetchDeliveryAddresses, updateDefaultAddress} from '../../redux/checkoutSlice';
import styles from './Delivery.module.css';
import Checkbox from "../../../../common/components/CheckBox/CheckBox";
import Select from "../../../../common/components/Select/Select";

const Delivery = ({setDefault, saveDefault}) => {
    const dispatch = useDispatch();
    const deliveryAddresses = useSelector(state => state.checkout.deliveryAddresses);
    const user = useSelector((state) => state.auth.user)
    const [expanded, setExpanded] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedCity, setSelectedCity] = useState({});
    const [selectedStreet, setSelectedStreet] = useState('');
    const [defaultAddress, setDefaultAddress] = useState(false);
    useEffect(() => {
        dispatch(fetchDeliveryAddresses());
    }, [dispatch]);
    useEffect(() => {
        if (user && user.address && deliveryAddresses.length > 0) {
            const newCountry = deliveryAddresses.find(country => country.country === user.address.country);
            setSelectedCountry(newCountry || {});
            if (newCountry !== undefined) {
                const state = newCountry.states.find(state => {
                    return state.state === user.address.state
                });
                setSelectedState(state || {});
                if (state) {
                    const newCity = state.cities.find(city => city === user.address.city);
                    setSelectedCity({city: newCity});
                    setSelectedStreet(user.address.street)
                    setDefaultAddress(true)
                    dispatch(updateDeliveryAddress(user.address))
                    dispatch(updateDefaultAddress(true));
                }
            }
        }
    }, [dispatch, user, deliveryAddresses]);

    const handleDefaultAddressChange = (event) => {
        setDefaultAddress(event.target.checked);
        // update the address in the store as well
        dispatch(updateDefaultAddress(event.target.checked));
    };
    const handleCountryChange = (event) => {
        const newCountry = deliveryAddresses.find(country => country.id === event.target.value);
        setSelectedCountry(newCountry || {});
        setSelectedState({});
        setSelectedCity({});
        dispatch(updateDeliveryAddress(null))
    };

    const handleStateChange = (event) => {
        const state = selectedCountry.states.find(state => {
            return state.state === event.target.value
        });
        setSelectedState(state || {});
        setSelectedCity({});
        dispatch(updateDeliveryAddress(null))
    };

    const handleCityChange = (event) => {
        const newCity = selectedState.cities.find(city => city === event.target.value);
        setSelectedCity({city: newCity});
        setSelectedStreet('')
        dispatch(updateDeliveryAddress(null))
    };

    const handleStreetAndDeliveryInstructions = (event) => {
        setSelectedStreet(event.target.value)
        const address = {
            country: selectedCountry.country,
            state: selectedState.state,
            city: selectedCity.city,
            street: event.target.value
        }
        dispatch(updateDeliveryAddress(address));
    }
    const submit = () => {
        const address = {
            country: selectedCountry.country,
            state: selectedState.state,
            city: selectedCity.city,
            street: selectedStreet
        }

        if (saveDefault && user && address.country && address.city && address.street && address.state) {
            const userAddress = user.address;
            const hasAddressChanged = userAddress ? Object.keys(address).some(key => userAddress[key] !== address[key]) : true;
            if (hasAddressChanged) {
                saveDefault(address)
            }
        }

        setExpanded(false)
    }
    return (
        <div className={styles.delivery}>
            <h2>Delivery</h2>
            {expanded ? (
                <div className={styles.addressForm}>
                    <>
                        <label className={styles.streetLabel} htmlFor="text">Country</label>
                        <Select
                            title={"Select country..."}
                            options={deliveryAddresses.map(country => ({value: country.id, label: country.country}))}
                            value={selectedCountry.id || ''}
                            onChange={handleCountryChange}
                        />
                    </>
                    {selectedCountry.states && (
                        <>
                            <label className={styles.streetLabel} htmlFor="text">State</label>
                            <Select
                                title={"Select state..."}
                                options={selectedCountry.states.map(state => ({
                                    value: state.state,
                                    label: state.state
                                }))}
                                value={selectedState.state || ''}
                                onChange={handleStateChange}
                            />
                        </>
                    )}
                    {selectedState.cities && (
                        <>
                            <label className={styles.streetLabel} htmlFor="text">City</label>
                            <Select
                                title={"Select city..."}
                                options={selectedState.cities.map(city => ({value: city, label: city}))}
                                value={selectedCity.city || ''}
                                onChange={handleCityChange}
                            />
                        </>
                    )}
                    {selectedCity.city && (
                        <div className={styles.streetForm}>
                            <label className={styles.streetLabel} htmlFor="text">Street</label>
                            <input type="text" placeholder="Street" value={selectedStreet}
                                   onChange={handleStreetAndDeliveryInstructions}/>
                        </div>
                    )}
                    {setDefault ? null :
                        selectedCity.city && user && (
                            <Checkbox
                                text="Set as default address" checked={defaultAddress}
                                onChange={handleDefaultAddressChange}
                            />
                        )
                    }
                    <button className={styles.deliveryButton} onClick={() => submit()}>Save</button>
                </div>
            ) : (
                <div className={styles.selectedAddress}>
                    {(selectedCity.city && selectedState.state && selectedCountry.country && selectedStreet !== '') ?
                        <>
                            <p> {selectedStreet}</p>
                            <p>{selectedCity.city}, {selectedState.state}, {selectedCountry.country}</p>
                        </>
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
