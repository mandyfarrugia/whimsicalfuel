let hasGoogleBeenInitialised = false;
let latestGoogleCallback = null;

export function waitForGoogleScriptToLoad() {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        const interval = setInterval(() => {
            attempts++;

            if(window.google && window.google.accounts && window.google.accounts.id) {
                clearInterval(interval);
                resolve();
            }

            if(attempts > 50) {
                clearInterval(interval);
                reject(new Error('Google Identity Services script failed to load.'));
            }
        }, 100);
    });
}

export const initialiseGoogleIdentity = async (callback) => {
    await waitForGoogleScriptToLoad();
    latestGoogleCallback = callback;

    if(hasGoogleBeenInitialised) return;

    if(!hasGoogleBeenInitialised) {
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: (response) => {
                if(latestGoogleCallback) {
                    latestGoogleCallback(response);
                }
            }
        });

        hasGoogleBeenInitialised = true;
    }
};