import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = '@ggstore:favoritos';
const CHAVE_PERFIL = '@ggstore:perfil';

export const PERFIL_PADRAO = { nomeJogador: 'Jogador', modoEscuro: false };
export async function obterFavoritos() {
  try {
    const json = await AsyncStorage.getItem(CHAVE_FAVORITOS);
    return json ? JSON.parse(json) : [];
  } catch (erro) {
    console.error('Erro ao obter favoritos:', erro);
    return [];
  }
}
export async function salvarFavorito(listaIds) {
  try {
    await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(listaIds));
  } catch (erro) {
    console.error('Erro ao salvar favoritos:', erro);
  }
}
export async function obterPerfil() {
  try {
    const json = await AsyncStorage.getItem(CHAVE_PERFIL);
    return json ? { ...PERFIL_PADRAO, ...JSON.parse(json) } : PERFIL_PADRAO;
  } catch (erro) {
    console.error('Erro ao obter perfil:', erro);
    return PERFIL_PADRAO;
  }
}
export async function salvarPerfil(perfil) {
  try {
    await AsyncStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
  } catch (erro) {
    console.error('Erro ao salvar perfil:', erro);
  }
}