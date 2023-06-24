import {useTranslation} from 'react-i18next';

const useCurrencyFormatter = () => {
    const { t } = useTranslation();

    return (amount) => {
        const amountString = amount.toLocaleString();
        return t('currency', {value: amountString});
    };
};

export default useCurrencyFormatter;