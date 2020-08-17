import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart, reduceItemQuantity, increaseItemQuantity } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/order';

const CartScreen = props => {

    const dispatch = useDispatch();
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => state.cart.items);
    console.log("Cart Screen");
    const transformedCartItems = [];
    for (const key in cartItems) {
        transformedCartItems.push({
            id: key,
            productTitle: cartItems[key].title,
            productImage: cartItems[key].imageUrl,
            productPrice: cartItems[key].price,
            quantity: cartItems[key].quantity,
            sum: cartItems[key].sum
        }); 
    }
    transformedCartItems.sort((a, b) => a.id > b.id);
 
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>Rs. {cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button 
                    title="ORDER NOW" 
                    color={Colors.accent} 
                    disabled={transformedCartItems.length === 0}
                    onPress={() => {
                        dispatch(addOrder(transformedCartItems, cartTotalAmount))
                    }} 
                />
            </View>
            
                <FlatList
                    data={transformedCartItems}
                    renderItem={itemData => 
                        <CartItem
                            image={itemData.item.productImage}
                            title={itemData.item.productTitle}
                            price={itemData.item.productPrice}
                            quantity={itemData.item.quantity}
                            sum={itemData.item.sum}
                            deletable={true}
                            onRemove={() => dispatch(removeFromCart(itemData.item.id))}
                            onReduceQuantity={() => dispatch(reduceItemQuantity(itemData.item.id))}
                            onIncreaseQuantity={() => dispatch(increaseItemQuantity(itemData.item.id))}
                        />
                    }
                />
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 10
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 18
    },
    amount: {
        color: Colors.accent
    }
});

export default CartScreen;