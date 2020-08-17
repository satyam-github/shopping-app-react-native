import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ScrollView, View, Text, Image, Button, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('productId');
    const availableProducts = useSelector(state => state.products.availableProducts);
    const selectedProduct = availableProducts.find(product => product.id === productId);
    console.log("Product Detail Screen");
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
                <View style={styles.buttonContainer}>
                    <Button title="Add to Cart" color={Colors.primary}
                        onPress={() => dispatch(cartActions.addToCart(selectedProduct))} />
                </View>
                <Text style={styles.price}>Rs. {selectedProduct.price.toFixed(2)}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </View>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
}

const styles = StyleSheet.create({
    screen: {
        margin: 10,
        height: 500
    },  
    buttonContainer: {
        marginVertical: 10
    },
    image: {
        width: '100%',
        height: '60%'
    },
    price: {
        color: '#888',
        padding: 10
    },
    description: {
        fontSize: 15,
        padding: 10
    }
});

export default ProductDetailScreen;