import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {jogos} from '../data/dados';
import {useApp} from '../context/AppContext';

export default function Detalhe({ route }) {
  const { cores, wishlist, toggleFavorito } = useApp();
  const jogo = jogos.find((j) => j.id === route.params.jogoId);

  if (!jogo) return null;

  const naWishlist = wishlist.includes(jogo.id);

  return (
    <ScrollView
      style={{ backgroundColor: cores.fundo }}
      contentContainerStyle={styles.container}
    >
      <Image source={{ uri: jogo.imagemCapa }} style={styles.capa} />
      <Text style={[styles.titulo, { color: cores.texto }]}>{jogo.titulo}</Text>
      <Text style={{ color: cores.secundario, marginBottom: 8 }}>
        Gênero: {jogo.genero}
      </Text>
      <Text style={[styles.preco, { color: cores.destaque }]}>
        {formatarPreco(jogo.preco)}
      </Text>
      <Text style={[styles.descricao, { color: cores.texto }]}>{jogo.descricao}</Text>

      <TouchableOpacity
        onPress={() => toggleFavorito(jogo.id)}
        activeOpacity={0.8}
        style={[
          styles.botao,
          { backgroundColor: naWishlist ? cores.secundario : cores.destaque },
        ]}
      >
        <Ionicons
          name={naWishlist ? 'heart' : 'heart-outline'}
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.botaoTexto}>
          {naWishlist ? 'Remover da Wishlist' : 'Adicionar à Wishlist'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16 
},
  capa: { 
    width: '100%', 
    height: 220, 
    borderRadius: 12, 
    marginBottom: 16 },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold' },
  preco: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginVertical: 8 },
  descricao: { 
    fontSize: 16, 
    lineHeight: 22, 
    marginBottom: 24 },
  botao: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 },
});