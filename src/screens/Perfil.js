import React, {useState} from 'react';
import {Alert, FlatList, Image ,StyleSheet,  Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {jogos} from '../data/dados';
import {useApp} from '../context/AppContext';

export default function Perfil() {
  const { cores, perfil, salvarPerfil, wishlist, toggleFavorito } = useApp();

  const [nome, setNome] = useState(perfil.nomeJogador);
  const [modoEscuro, setModoEscuro] = useState(perfil.modoEscuro);

  const favoritos = jogos.filter((j) => wishlist.includes(j.id));

  const salvar = async () => {
    const nomeFinal = nome.trim() || 'Jogador';
    setNome(nomeFinal);
    await salvarPerfil({ nomeJogador: nomeFinal, modoEscuro });
    Alert.alert('Pronto', 'Configurações salvas!');
  };

  const Cabecalho = (
    <View>
      <Text style={[styles.titulo, {color: cores.texto}]}>Meu Perfil</Text>

      <View style={[styles.cardConfig, {backgroundColor: cores.card, borderColor: cores.borda}]}>
        <Text style={[styles.rotulo, {color: cores.destaque}]}>CONFIGURAÇÕES</Text>

        <Text style={{color: cores.secundario, marginBottom: 6}}>Nome de Jogador (Nickname)</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nickname"
          placeholderTextColor={cores.secundario}
          style={[
            styles.input,
            {color: cores.texto, borderColor: cores.borda, backgroundColor: cores.fundo},
          ]}
        />

        <View style={styles.linhaSwitch}>
          <View>
            <Text style={[styles.rotuloSwitch, {color: cores.texto}]}>Modo Escuro</Text>
            <Text style={{color: cores.secundario}}>Tema do aplicativo</Text>
          </View>
          <Switch
            value={modoEscuro}
            onValueChange={setModoEscuro}
            trackColor={{true: cores.destaque, false: cores.borda}}
          />
        </View>

        <TouchableOpacity
          onPress={salvar}
          activeOpacity={0.8}
          style={[styles.botaoSalvar, {backgroundColor: cores.destaque}]}
        >
          <Text style={styles.botaoTexto}>Salvar Configurações</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.rotulo, {color: cores.destaque, marginTop: 8}]}>MINHA WISHLIST</Text>
    </View>
  );

  return (
    <FlatList
      data={favoritos}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={Cabecalho}
      contentContainerStyle={[styles.container, {backgroundColor: cores.fundo}]}
      renderItem={({ item }) => (
        <View style={[styles.itemWishlist, {backgroundColor: cores.card, borderColor: cores.borda}]}>
          <Image source={{uri: item.imagemCapa}} style={styles.thumb} />
          <View style={styles.itemInfo}>
            <Text numberOfLines={1} style={[styles.itemTitulo, {color: cores.texto}]}>
              {item.titulo}
            </Text>
            <Text style={{color: cores.destaque, fontWeight: '600', marginTop: 4}}>
              {formatarPreco(item.preco)}
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleFavorito(item.id)} hitSlop={10}>
            <Ionicons name="trash-outline" size={22} color="#E5484D" />
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Ionicons name="heart-outline" size={48} color={cores.secundario} />
          <Text style={[styles.vazioTexto, {color: cores.secundario}]}>
            Sua wishlist está vazia.{'\n'}Abra um jogo e toque em "Adicionar à Wishlist".
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    flexGrow: 1 
},
  titulo: { 
    fontSize: 24, 
    fontWeight: '800', 
    marginBottom: 16 
},
  cardConfig: { 
    borderWidth: 1, 
    borderRadius: 14, 
    padding: 16, 
    arginBottom: 20 
},
  rotulo: { 
    fontSize: 14, 
    fontWeight: '800', 
    marginBottom: 12, 
    letterSpacing: 0.5 
},
  input: { 
    borderWidth: 1, 
    borderRadius: 10, 
    padding: 12, 
    fontSize: 16, 
    marginBottom: 16 
},
  linhaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rotuloSwitch: { 
    fontWeight: '700', 
    fontSize: 16 
},
  botaoSalvar: { 
    padding: 14, 
    borderRadius: 10, 
    alignItems: 'center' 
},
  botaoTexto: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
},
  itemWishlist: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  thumb: {
    width: 60, 
    height: 60, 
    borderRadius: 8 
},
  itemInfo: { 
    flex: 1, 
    marginLeft: 12, 
    marginRight: 8 
},
  itemTitulo: { 
    fontSize: 16, 
    fontWeight: '700' 
},
  vazio: { 
    alignItems: 'center', 
    marginTop: 40 
},
  vazioTexto: { 
    textAlign: 'center', 
    marginTop: 12, 
    fontSize: 15, 
    lineHeight: 22 },
});