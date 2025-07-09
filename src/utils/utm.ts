export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export const getUTMParams = (): UTMParams => {
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
  };
};

export const getUTMParamsFromStorage = (): UTMParams => {
  // Сначала пытаемся получить из URL
  const urlParams = getUTMParams();
  
  // Если есть UTM параметры в URL, сохраняем их в localStorage
  if (Object.values(urlParams).some(value => value !== undefined)) {
    localStorage.setItem('utm_params', JSON.stringify(urlParams));
    return urlParams;
  }
  
  // Если в URL нет UTM параметров, пытаемся получить из localStorage
  try {
    const storedParams = localStorage.getItem('utm_params');
    if (storedParams) {
      return JSON.parse(storedParams);
    }
  } catch (error) {
    console.warn('Ошибка при получении UTM параметров из localStorage:', error);
  }
  
  return {};
}; 