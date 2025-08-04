



import { supabase } from '../lib/supabase';

export async function obtenerCostos() {
  const { data, error } = await supabase.from('costos').select('*');
  return { data, error };
}

export async function agregarCosto(costo) {
  const { error } = await supabase.from('costos').insert([costo]);
  return { error };
}

export async function actualizarCosto(id, cambios) {
  const { data, error } = await supabase.from('costos').update(cambios).eq('id', id);
  return { data, error };
}

export async function eliminarCosto(id) {
  const { data, error } = await supabase.from('costos').delete().eq('id', id);
  return { data, error };
}
