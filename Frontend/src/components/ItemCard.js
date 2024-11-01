import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const ItemCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {item.imagem ? (
        <Image source={{ uri: item.imagem }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.nome}</Text>
        <Text style={styles.price}>R$ {item.preco}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10 },
  image: { width: 60, height: 60, borderRadius: 30 },
  placeholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ccc' },
  info: { marginLeft: 10, justifyContent: 'center' },
  title: { fontSize: 18 },
  price: { color: '#888' },
});

export default ItemCard;