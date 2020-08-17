import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

const ProductsOverviewScreen = props => {
    
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch(); 
    console.log("Product Overview Screen");

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
         })
    }

    return (
        <FlatList
            data={products}
            renderItem={itemData => 
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}>
                        <Button title="View Details"
                            color={Colors.primary}
                            onPress={() => {
                                selectItemHandler(itemData.item.id, itemData.item.title)
                            }} />
                        <FontAwesome name="cart-plus" size={30} 
                            color={Colors.primary} 
                            onPress={() => {
                                dispatch(cartActions.addToCart(itemData.item));
                            }} />
                </ProductItem>
            }
        />
    ) 
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Products',
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
                    title='Cart' 
                    iconName='md-cart'
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }} 
                />
            </HeaderButtons>
        )
    }
    
}

export default ProductsOverviewScreen;