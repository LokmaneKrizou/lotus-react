import React, {useEffect, useState} from 'react';
import ChipItem from '../ChipItem/ChipItem';
import Divider from "../../../../common/components/Divider/Divider";
import styles from "./WrappedChipGroup.module.css"

const WrappedChipGroup = ({variants, onChange}) => {
    const [selected, setSelected] = useState([]);

    const handleChipClick = (variantName, value) => {
        setSelected(prev => {
            const alreadySelected = prev.find(item => item.name === variantName && item.value === value);
            if (alreadySelected) {
                return prev.filter(item => item.name !== variantName || item.value !== value);
            } else {
                return [...prev, {name: variantName, value: value}];
            }
        });
    };

    useEffect(() => {
        onChange(selected);
    }, [selected, onChange]);
    return (
        <div className={styles.wrappedChipGroup}>
            {Array.from(variants.entries()).map(([variantName, values], index) => (
                <div className={styles.wrappedChipGroup} key={index}>
                    <div>
                        <div>{variantName}</div>
                        {Array.from(values).map((value, index) => {
                            const isSelected = !!selected.find(item => item.name === variantName && item.value === value);
                            return (
                                <ChipItem
                                    key={index}
                                    label={value}
                                    isSelected={isSelected}
                                    onClick={() => handleChipClick(variantName, value)}
                                />
                            )
                        })}
                    </div>
                    {variants.size > (index + 1) && <Divider/>}
                </div>
            ))}
        </div>
    );
};

export default WrappedChipGroup;
