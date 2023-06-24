import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateClientInfo} from '../../redux/slices/checkoutSlice';
import styles from './ClientInfo.module.css';

const ClientInfo = () => {

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhone(user.phone);
            setExpanded(false);
            dispatch(updateClientInfo({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }));
        }
    }, [user]);

    const handleInputChange = (event, setState) => {
        setState(event.target.value);
        dispatch(updateClientInfo({firstName, lastName, email, phone}));
    };

    const handleSave = () => {
        if (firstName && lastName && email && phone) {
            setExpanded(false);
            dispatch(updateClientInfo({firstName, lastName, email, phone}));
        }
    };

    const handleExpand = () => {
        setExpanded(true);
    };

    return (
        <div className={styles.clientInfo}>
            <h2>Client Information</h2>
            {expanded ? (
                <div className={styles.infoForm}>
                    <label htmlFor="text" className={styles.label}>Firstname</label>
                    <input type="text" placeholder="FirstName" value={firstName}
                           onChange={(event) => handleInputChange(event, setFirstName)}/>
                    <label htmlFor="text" className={styles.label}>Lastname</label>
                    <input type="text" placeholder="LastName" value={lastName}
                           onChange={(event) => handleInputChange(event, setLastName)}/>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" placeholder="Email" value={email}
                           onChange={(event) => handleInputChange(event, setEmail)}/>
                    <label htmlFor="number" className={styles.label}>Phone</label>
                    <input type="number" placeholder="Phone Number" value={phone}
                           onChange={(event) => handleInputChange(event, setPhone)}/>
                    <button className={styles.submit} onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div className={styles.savedInfo}>
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                    <p>{email}</p>
                    <p>{phone}</p>
                    <button className={styles.submit} onClick={handleExpand}>Change</button>
                </div>
            )}
        </div>
    );
};

export default ClientInfo;
