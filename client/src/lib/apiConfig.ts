// API Configuration utility
export const getApiBaseUrl = (): string => {
  const base = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
  if (!base) {
    console.error("Missing VITE_API_URL environment variable");
    throw new Error("Missing VITE_API_URL");
  }
  return base;
};

export const buildApiUrl = (endpoint: string): string => {
  const base = getApiBaseUrl();
  return `${base}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};

// Validate API configuration on app startup
export const validateApiConfig = (): void => {
  try {
    getApiBaseUrl();
    console.log("✅ API configuration validated successfully");
  } catch (error) {
    console.error("❌ API configuration error:", error);
  }
};
