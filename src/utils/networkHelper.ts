// Network utility helpers

// Helper to add timeout to fetch requests
const fetchWithTimeout = async (url: string, timeout = 5000): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const checkInternetConnection = async (): Promise<boolean> => {
  try {
    // Try to reach Google's DNS server with 5s timeout
    const response = await fetchWithTimeout('https://www.google.com', 5000);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Try to reach Supabase API with 5s timeout
    await fetchWithTimeout('https://sfhkchooqiqyzrwkvziz.supabase.co/rest/v1/', 5000);
    return true;
  } catch (error) {
    console.error('❌ Cannot reach Supabase servers:', error);
    return false;
  }
};

export const diagnoseNetworkIssue = async (): Promise<string> => {
  const hasInternet = await checkInternetConnection();
  
  if (!hasInternet) {
    return 'No internet connection. Please check your Wi-Fi or mobile data.';
  }
  
  const canReachSupabase = await checkSupabaseConnection();
  
  if (!canReachSupabase) {
    return 'Cannot reach Supabase servers. This might be due to firewall or regional restrictions.';
  }
  
  return 'Network seems fine. The issue might be temporary.';
};
