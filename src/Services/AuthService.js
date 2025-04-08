const TOKEN_API = 'https://6970-49-206-36-177.ngrok-free.app/api/token';

// Function to decode JWT
const decodeJWT = (token) => {
    try {
        const payload = token.split('.')[1]; // Get the payload part
        const decoded = JSON.parse(atob(payload)); // Decode Base64
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// Fetch new token
export const fetchToken = async () => {
    try {
        const response = await fetch(TOKEN_API, { method: 'GET', headers: {"ngrok-skip-browser-warning": "69420"} });

        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }

        const result = await response.json();
        const token = result.data.attributes.access_token[0];
        const decodedToken = decodeJWT(token);

        if (!decodedToken || !decodedToken.exp) {
            throw new Error('Invalid token received');
        }

        const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', expiryTime);

        console.log(`Token will expire at: ${new Date(expiryTime).toLocaleString()}`);

        // Schedule the next token refresh
        scheduleTokenRefresh(expiryTime);

        return token;
    } catch (error) {
        console.error('Error fetching token:', error);
        return null;
    }
};

// Get token (fetch new one if expired)
export const getToken = async () => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('tokenExpiry');

    if (token && expiry && Date.now() < expiry) {
        return token; // Return valid token
    } else {
        return await fetchToken(); // Fetch new token if expired
    }
};

// Schedule refresh exactly at expiry time
const scheduleTokenRefresh = (expiryTime) => {
    const refreshDelay = expiryTime - Date.now();
    if (refreshDelay > 0) {
        setTimeout(() => {
            console.log('Token expired. Fetching new token...');
            fetchToken();
        }, refreshDelay);
    }
};
