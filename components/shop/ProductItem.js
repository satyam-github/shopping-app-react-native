import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';


const ProductItem = props => {
    return (
        <TouchableOpacity onPress={props.onSelect}>
            <View style={styles.product}>
                <View  style={styles.imageContainer}>
                    <Image source={{uri: props.image}} style={styles.image} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>Rs. {props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {props.children}
                    {/* <Button
                        title='Cart'
                        color={Colors.primary}
                        onPress={props.onAddToCart} /> */}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        height: 300,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: '25%'
    },
    detailsContainer: {
        flexDirection: 'row',
        height: '10%',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        paddingHorizontal: 10
    },
    price: {
        fontSize: 14,
        paddingHorizontal: 10,
        color: '#888'
    }
});

export default ProductItem;