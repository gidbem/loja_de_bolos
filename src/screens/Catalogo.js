import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {jogos} from '../data/dados';
import CardJogo from '../components/CardJogo';
import {useApp} from '../context/AppContext';

export default function Catalogo({ navigation }) {
  const { cores } = useApp();

  const jogoDestaque = jogos.find((j) => j.destaque);
  const demais = jogos.filter((j) => !j.destaque);

  const abrirDetalhes = (jogo) => navigation.navigate('Detalhes', { jogoId: jogo.id });
  const Cabecalho = (
    <View>
      {jogoDestaque && (
        <>
          <Text style={[styles.secao, {color: cores.texto}]}>Em destaque</Text>
          <CardJogo
            jogo={jogoDestaque}
            destaque
            onPress={() => abrirDetalhes(jogoDestaque)}
          />
        </>
      )}
      <Text style={[styles.secao, {color: cores.texto}]}>Todos os jogos</Text>
    </View>
  );

  return (
    <FlatList
      data={demais}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.linhaGrid}
      ListHeaderComponent={Cabecalho}
      renderItem={({ item }) => (
        <CardJogo jogo={item} onPress={() => abrirDetalhes(item)} />
      )}
      contentContainerStyle={[styles.container, { backgroundColor: cores.fundo }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16 
},
  secao: {
    fontSize: 20, 
    fontWeight: '800', 
    marginBottom: 12 
},
  linhaGrid: { 
    justifyContent: 'space-between' 
},
});