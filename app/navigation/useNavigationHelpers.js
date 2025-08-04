import { useRouter } from 'expo-router';
import { ROUTES } from './routeNames';

export function useNavigationHelpers() {
  const router = useRouter();

  //  VIAJES
  const goToNuevoViaje = () => router.push(ROUTES.NUEVO_VIAJE);
  const goToDetalleViaje = (id) => router.push(ROUTES.DETALLE_VIAJE(id));
  const goToEditarViaje = (id) => router.push(ROUTES.EDITAR_VIAJE(id));

  //  DESTINOS
  const goToNuevoDestino = () => router.push(ROUTES.NUEVO_DESTINO);
  const goToEditarDestino = (id) => router.push(ROUTES.EDITAR_DESTINO(id));

  //  INTEGRANTES
  const goToNuevoIntegrante = () => router.push(ROUTES.NUEVO_INTEGRANTE);
  const goToEditarIntegrante = (id) => router.push(ROUTES.EDITAR_INTEGRANTE(id));

  //  COSTOS
  const goToNuevoCosto = () => router.push(ROUTES.NUEVO_COSTO);
  const goToEditarCosto = (id) => router.push(ROUTES.EDITAR_COSTO(id));

  //  Genérico
  const goBack = () => router.back();

  return {
    // Viajes
    goToNuevoViaje,
    goToDetalleViaje,
    goToEditarViaje,

    // Destinos
    goToNuevoDestino,
    goToEditarDestino,

    // Integrantes
    goToNuevoIntegrante,
    goToEditarIntegrante,

    // Costos
    goToNuevoCosto,
    goToEditarCosto,

    // Global
    goBack,
  };
}
