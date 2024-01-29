import React, {useState} from 'react';
import Percentage from '../Percentage/Percentage';
import StatusDropdown from '../StatusDropDown/StatusDropDown';
import ExpandButton from '../ExpandButton/ExpandButton';
import styles from './OrderRow.module.css';
import useCurrencyFormatter from "../../../../../util/priceFormatter"; // Import the CSS module

const OrderRow = ({order}) => {
    const priceFormatter = useCurrencyFormatter();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        // Any additional logic when expanding/collapsing
    };
    return (
        <>
            <tr className={`${isExpanded ? styles.orderRowExpanded : styles.orderRow}`}>
                <td className={styles.cell}><b>#{order.orderId}</b></td>
                <td className={styles.cell}>{order.createdTime}</td>
                <td className={styles.cell}>{order.user.name ? order.user.name : "Guest"}</td>
                <td className={styles.cell}>{order.customerName}</td>
                <td className={styles.cell}>{priceFormatter(order.totalAmount)}</td>
                <td className={styles.cell}>
                    <Percentage amount={order.profitAmount} percentage={order.profitPercentage}/>
                </td>
                <td className={styles.cell}>
                    {order.status && <StatusDropdown initialStatus={order.status}/>}
                </td>
                <td className={styles.cell}>
                    <ExpandButton onClick={toggleExpand} isExpanded={isExpanded}/>
                </td>
            </tr>
            {isExpanded && (
                <tr className={styles.expandedRow}>
                    <td colSpan={7}>
                        <table className={styles.expandedRowTable}>
                            <thead>
                            <tr>
                                <th className={styles.expandedCell}>#</th>
                                <th className={styles.expandedCell}>Image</th>
                                <th className={styles.expandedCell}>Product ID</th>
                                <th className={styles.expandedCell}>Price</th>
                                <th className={styles.expandedCell}>Variant Selections</th>
                                <th className={styles.expandedCell}>QTY</th>
                                <th className={styles.expandedCell}>TOTAL</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.items && order.items.map((item) =>
                                <tr>
                                    <td className={styles.expandedCell}></td>
                                    <td className={styles.expandedCell}><img src={item.product.image}
                                                                             alt={item.product.name}/>
                                    </td>
                                    <td className={styles.expandedCell}>{item.product.name}</td>
                                    <td className={styles.expandedCell}>{priceFormatter(item.product.price)}</td>
                                    <td className={styles.expandedCell}>
                                        <div
                                            className={styles.variantSelections}>
                                            {item.variantSelections && item.variantSelections.length > 0 ? item.variantSelections.map((variant) =>
                                                <div className={styles.variantSelection}>
                                                    <div className={styles.selectionName}>{variant.name}:</div>
                                                    <div className={styles.selectionValue}>{variant.value}</div>
                                                </div>) : "N/A"}
                                        </div>
                                    </td>
                                    <td className={styles.expandedCell}>X{item.product.quantity}</td>
                                    <td className={styles.expandedCell}>
                                        {priceFormatter(item.product.price  * item.product.quantity)}
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </td>
                </tr>
            )}

        </>
    );
};

export default OrderRow;
