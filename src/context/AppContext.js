import React, { createContext, useContext, useEffect, useState } from 'react';
import {obterFavoritos, salvarFavorito, obterPerfil, salvarPerfil as salvarPerfilStorage,} from '../dao/DAO';
import {temas} from '../theme';

const PERFIL_INICIAL = { nomeJogador: 'Jogador', modoEscuro: false };

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [perfil, setPerfil] = useState(PERFIL_INICIAL);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const [ids, dadosPerfil] = await Promise.all([
          obterFavoritos(),
          obterPerfil(),
        ]);
        setWishlist(Array.isArray(ids) ? ids : []);
        setPerfil({ ...PERFIL_INICIAL, ...(dadosPerfil || {}) });
      } catch (erro) {
        console.warn('Erro ao carregar dados:', erro);
      } finally {
        setCarregado(true);
      }
    }
    carregar();
  }, []);

  const toggleFavorito = async (id) => {
    const nova = wishlist.includes(id)
      ? wishlist.filter((item) => item !== id)
      : [...wishlist, id];
    setWishlist(nova);
    await salvarFavorito(nova);
  };

  const salvarPerfil = async (novoPerfil) => {
    setPerfil(novoPerfil);
    await salvarPerfilStorage(novoPerfil);
  };

  const cores = perfil?.modoEscuro ? temas.escuro : temas.claro;

  return (
    <AppContext.Provider
      value={{ wishlist, toggleFavorito, perfil, salvarPerfil, cores, carregado }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);