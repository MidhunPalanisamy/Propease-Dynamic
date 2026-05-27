const requiredEnv = (name) => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
};

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const API_BASE_URL = trimTrailingSlash(requiredEnv("REACT_APP_API_BASE_URL"));
export const MAP_TILE_URL = requiredEnv("REACT_APP_MAP_TILE_URL");
export const WHATSAPP_BASE_URL = trimTrailingSlash(requiredEnv("REACT_APP_WHATSAPP_BASE_URL"));
export const PROPERTY_PLACEHOLDER_IMAGE_URL = requiredEnv("REACT_APP_PROPERTY_PLACEHOLDER_IMAGE_URL");
export const PROFILE_AVATAR_URL = requiredEnv("REACT_APP_PROFILE_AVATAR_URL");

export const FEATURE_FLAGS = {
    payments: process.env.REACT_APP_ENABLE_PAYMENTS === "true",
};
