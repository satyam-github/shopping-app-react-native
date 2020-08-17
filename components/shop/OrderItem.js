import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>Total: Rs. {props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <FlatList data={props.orderDetail}
                renderItem={itemData => (
                    <View style={styles.cartItems}>
                        <Text>{itemData.item.quantity} | </Text>
                        <Text>{itemData.item.productTitle} | </Text>
                        <Text>Rs. {itemData.item.sum}</Text>
                    </View>
                )} />
            <Button 
                color={Colors.primary} 
                title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }} />
            {showDetails && <View style={styles.cartListContainer}>
                    {props.orderDetail.map(cartItem => 
                        <CartItem
                            key={cartItem.id}
                            image={cartItem.productImage}
                            price={cartItem.productPrice}
                            quantity={cartItem.quantity}
                            title={cartItem.title}
                            sum={cartItem.sum}
                            deletable={false} />)}
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 10,
        padding: 15,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    cartItems: {
        flexDirection: 'row',
        marginBottom: 5
    },
    cartListContainer: {
        margin: 10,
        padding: 10
    }
})

export default OrderItem;