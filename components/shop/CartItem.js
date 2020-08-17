import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

const CartItem = props => {

    return (
        <View style={styles.cartItem}>
            <View style={styles.imageContainer}>
                <Image source={{uri: props.image}} style={styles.image} />
            </View>
            <View style={styles.detailContainer}>
                <Text>{props.title}</Text>
                <Text>Price: {props.price}</Text>
                <View style={styles.quantityContainer}>
                    <Text>Quantity: {props.quantity}</Text>
                    {props.deletable && <TouchableOpacity 
                        onPress={props.onReduceQuantity}
                        style={styles.quantityController}>
                        <AntDesign name="minussquareo" size={20} color={Colors.primary} />
                    </TouchableOpacity>}
                    {props.deletable && <TouchableOpacity
                        onPress={props.onIncreaseQuantity}
                        style={styles.quantityController}>
                        <AntDesign name="plussquareo" size={20} color={Colors.primary} />
                    </TouchableOpacity>}
                </View>
                <Text>Total: {props.sum.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity
                    onPress={props.onRemove}
                    style={styles.iconContainer}>
                     <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: "row",
        height: 150,
        width: '100%',
        padding: 10,
        marginBottom: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    imageContainer: {
        width: '40%',
        height: '100%',
        marginHorizontal: '2%'
    },
    image: {
        width: '100%',
        height: '100%'
    },  
    detailContainer: {
        width: '60%',
        marginHorizontal: '2%'
    },
    quantityContainer: {
        flexDirection: 'row'
    },  
    iconContainer: {
        marginHorizontal: '2%'
    },
    quantityController: {
        paddingHorizontal: 10
    }
});

export default CartItem;