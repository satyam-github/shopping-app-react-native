import React from 'react';
import { FlatList, Button, Alert } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts);
    console.log("User Products Screen ");
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate({
            routeName: 'EditProduct',
            params: {
                productId: id
            }
        })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure ?',
            'Do you really want to delete this item?',
            [
                { text: 'No', style: 'default' },
                { 
                    text: 'Yes', 
                    style: 'destructive', 
                    onPress: () => {
                        dispatch(deleteProduct(id))
                    }
                }
            ]);
    }

    return (
        <FlatList
            data={userProducts}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    price={itemData.item.price}
                    title={itemData.item.title} 
                    onSelect={() => { editProductHandler(itemData.item.id) }} >
                    <Button title="Edit"
                        color={Colors.primary}
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }} />
                    <Button title="Delete"
                        color='red'
                        onPress={deleteHandler.bind(this, itemData.item.id)} />
                </ProductItem>
            )} />
    );
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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
        ),
        headerRight: () =>  (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Add' 
                    iconName='md-create'
                    onPress={() => {
                        navData.navigation.navigate('EditProduct')
                    }} 
                />
            </HeaderButtons>
        )
    }
}

export default UserProductsScreen;