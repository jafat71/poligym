import { useQueryClient } from '@tanstack/react-query';
import { Button, Pressable, ScrollView, Text } from 'react-native';

const DebugCache = () => {
  const queryClient = useQueryClient();

  const logCache = () => {
    // Obtener todas las consultas del caché
    const allQueries = queryClient.getQueryCache().findAll();

    // Loguear datos del caché
    console.log(
      'Estado del caché:',
      allQueries.map(query => ({
        queryKey: query.queryKey,
        state: query.state,
      }))
    );
  };

  return (
      <Pressable onPress={logCache} className='bg-red-500 p-2 rounded-md absolute bottom-10 right-10'>
        <Text>Mostrar Caché</Text>
      </Pressable>
  );
};

export default DebugCache;
