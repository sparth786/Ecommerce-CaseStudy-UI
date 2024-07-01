import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: "1d2bea26-f573-4d2e-acfa-8cc030960c4c",
        authority: "https://login.microsoftonline.com/sparth786gmail.onmicrosoft.com",
        redirectUri: "http://localhost:3000",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storageAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch(level){
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const loginRequest =  {
    scopes: ["user.read"],
}