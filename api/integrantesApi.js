



import { supabase } from '../lib/supabase';

/**
 * Trae todos los integrantes
 */
export async function obtenerIntegrantes() {
  const { data, error } = await supabase.from('integrantes').select('*');
  return { data, error };
}


/**
 * Agrega un nuevo integrante
 * @param {Object} integrante - nombre y teléfono
 */
export async function agregarIntegrante(integrante) {
  const { error } = await supabase.from('integrantes').insert([integrante]);
  return { error };
}
/**
 * Actualiza un integrante
 * @param {number} id - ID del integrante
 * @param {Object} cambios - datos modificados
 */
export async function actualizarIntegrante(id, cambios) {
  const { data, error } = await supabase.from('integrantes').update(cambios).eq('id', id);
  return { data, error };
}


/**
 * Elimina un integrante
 * @param {number} id - ID del integrante
 */
export async function eliminarIntegrante(id) {
  const { data, error } = await supabase.from('integrantes').delete().eq('id', id);
  return { data, error };
}
