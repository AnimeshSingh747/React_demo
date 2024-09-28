//Functional comp
function Greetings(props) {
    return <h1>Hello, {props.name}!</h1>;
}

//Class comop
class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>
    }
}