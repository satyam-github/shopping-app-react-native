import React from 'react';
import { FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import { useSelector } from 'react-redux';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    console.log(orders);
    return (
        <FlatList
            data={orders}
            renderItem={itemData => (
                <OrderItem
                    amount={itemData.item.totalAmount}
                    orderDetail={itemData.item.items}
                    date={itemData.item.readableDate}
                />)} 
        />
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () =>  (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu' 
                    iconName='md-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }} 
                />
            </HeaderButtons>
        )
    }
}

export default OrdersScreen;