export const ROUTES = {
  // Viajes
  NUEVO_VIAJE: '/viajes/nuevo',
  DETALLE_VIAJE: (id) => `/viajes/${id}`,
  EDITAR_VIAJE: (id) => `/viajes/editar/${id}`,

  // Destinos
  NUEVO_DESTINO: '/destinos/nuevo',
  EDITAR_DESTINO: (id) => `/destinos/editar/${id}`,

  // Integrantes
  NUEVO_INTEGRANTE: '/integrantes/nuevo',
  EDITAR_INTEGRANTE: (id) => `/integrantes/editar/${id}`,

  // Costos
  NUEVO_COSTO: '/costos/nuevo',
  EDITAR_COSTO: (id) => `/costos/editar/${id}`,
};
