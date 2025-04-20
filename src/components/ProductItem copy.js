import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

export default function ProductItem({ product, onRemove }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <View style={styles.productInfo}>
            <Text style={styles.title}>{product.name}</Text>
            <Text>Preço: R$ {product.price.toFixed(2)}</Text>
            <Text>Quantidade: {product.quantity}</Text>
            <Text>Subtotal: R$ {(product.price * product.quantity).toFixed(2)}</Text>
          </View>
          <IconButton
            icon="delete"
            color="#FF0000"
            onPress={onRemove}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});