import React, { useState, useEffect, useCallback } from 'react';
import {View, ScrollView, Text, StyleSheet, TextInput} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import { updateProduct, createProduct } from '../../store/actions/products';

const EditProductScreen = props => {
    const id = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(product => product.id === id));
    
    const dispatch = useDispatch();
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState(editedProduct ? editedProduct.price.toString() : '');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        if(editedProduct) {
            dispatch(updateProduct(id, title, description, imageUrl, +price));
        } else {
            dispatch(createProduct(title, description, imageUrl, +price));
        }
        props.navigation.goBack();
    }, [title, imageUrl, price, description, id]);

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} 
                        value={title} 
                        autoCapitalize='sentences'
                        onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>ImageUrl</Text>
                    <TextInput style={styles.input} 
                        value={imageUrl} 
                        onChangeText={text => setImageUrl(text)}/>
                </View>
                {editedProduct ? <View style={styles.formControl}>
                        <Text style={styles.label}>Price (Not editable)</Text>
                        <TextInput style={styles.input}
                            value={price} />
                    </View> : 
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput style={styles.input}
                            value={price}
                            keyboardType='decimal-pad'
                            onChangeText={text => setPrice(text)} />
                    </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)} />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: () =>  (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Save' 
                    iconName='md-checkmark'
                    onPress={submitFn} 
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%',
        padding: 10
    },
    label: {
        fontFamily: 'open-sans-bold'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default EditProductScreen;