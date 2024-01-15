const Login = () => {
    useEffect(() => {
        ui.start("#firebaseui-auth-container", uiConfig);
    }, []);

    return (
        <div>
            <h1>Login</h1>
            <div id="firebaseui-auth-container"></div>
        </div>
    );
};
