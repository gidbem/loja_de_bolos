import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useApp} from '../context/AppContext';

export default function Jogo({ jogo, onPress, destaque = false }) {
  const { cores } = useApp();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        destaque ? styles.cardDestaque : styles.card,
        { backgroundColor: cores.card, borderColor: cores.borda },
      ]}
    >
      <View>
        <Image
          source={{ uri: jogo.imagemCapa }}
          style={destaque ? styles.capaDestaque : styles.capa}
        />
        {destaque && (
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>EM DESTAQUE</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text
          numberOfLines={1}
          style={[styles.titulo, destaque && styles.tituloDestaque, { color: cores.texto }]}
        >
          {jogo.titulo}
        </Text>

        {destaque && (
          <Text numberOfLines={2} style={{ color: cores.secundario, marginTop: 4 }}>
            {jogo.descricao}
          </Text>
        )}

        <View style={styles.linha}>
          <Text style={{ color: cores.secundario }}>{jogo.genero}</Text>
          <Text style={[styles.preco, { color: cores.destaque }]}>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardDestaque: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },
  capa: { 
    width: '100%', 
    height: 130 },
  capaDestaque: { 
    width: '100%', 
    height: 200 },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeTexto: { 
    color: '#fff', 
    fontWeight: '800', 
    fontSize: 11 },
  info: { 
    padding: 12 
},
  titulo: { 
    ontSize: 16, 
    fontWeight: '700' 
},
  tituloDestaque: { 
    fontSize: 22, 
    fontWeight: '800' 
},
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  preco: { 
    fontSize: 15, 
    fontWeight: '700' 
},
});