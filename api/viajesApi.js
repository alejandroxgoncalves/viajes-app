


import { supabase } from '../lib/supabase';

/**
 * Trae todos los viajes de la base de datos
 */
export async function obtenerViajes() {
  const { data, error } = await supabase.from('viajes').select('*');
  return { data, error };
}
/**
 * Agrega un nuevo viaje
 * @param {Object} viaje - objeto con nombre, fechas, destinos, integrantes, costos, etc.
 */
export async function agregarViaje(viaje) {
  const { error } = await supabase.from('viajes').insert([viaje]);
  return { error };
}
/**
 * Actualiza un viaje existente por ID
 * @param {number} id - ID del viaje
 * @param {Object} cambios - campos a actualizar
 */
export async function actualizarViaje(id, cambios) {
  const { data, error } = await supabase.from('viajes').update(cambios).eq('id', id);
  return { data, error };
}

/**
 * Elimina un viaje por ID
 * @param {number} id - ID del viaje
 */
export async function eliminarViaje(id) {
  const { data, error } = await supabase.from('viajes').delete().eq('id', id);
  return { data, error };
}