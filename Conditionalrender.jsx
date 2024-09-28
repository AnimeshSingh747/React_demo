function LoginButton(props) {
    if (props.isLoggedIn) {
        return <button>Logout</button>;
    }
    return <button>Login</button>
}