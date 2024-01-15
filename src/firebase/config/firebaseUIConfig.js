import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';

const uiConfig = {
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        GoogleAuthProvider.PROVIDER_ID, // This adds Google as a sign-in provider
        // Add other authentication providers as needed
    ],
    signInSuccessUrl: "/", // Redirect to home page after successful login
    // ... you may have other configuration options
};

export default uiConfig;
