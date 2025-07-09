import { useEffect } from 'react';
import { getUTMParamsFromStorage } from '../utils/utm';

export const useUTMTracking = () => {
  useEffect(() => {
    // Автоматически сохраняем UTM параметры при загрузке страницы
    getUTMParamsFromStorage();
  }, []);
}; 