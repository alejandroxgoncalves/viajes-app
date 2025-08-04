



import { supabase } from '../lib/supabase';

/**
 * Trae todos los destinos
 */
export async function obtenerDestinos() {
  const { data, error } = await supabase.from('destinos').select('*');
  return { data, error };
}
/**
 * Agrega un nuevo destino
 * @param {Object} destino - nombre, latitud, longitud
 */
export async function agregarDestino(destino) {
  const { error } = await supabase.from('destinos').insert([destino]);
  return { error };
}
/**
 * Actualiza un destino
 * @param {number} id - ID del destino
 * @param {Object} cambios - datos modificados
 */
export async function actualizarDestino(id, cambios) {
  const { data, error } = await supabase.from('destinos').update(cambios).eq('id', id);
  return { data, error };
}

/**
 * Elimina un destino
 * @param {number} id - ID del destino
 */
export async function eliminarDestino(id) {
  const { data, error } = await supabase.from('destinos').delete().eq('id', id);
  return { data, error };
}
