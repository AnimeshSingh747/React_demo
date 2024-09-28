const { useEffect } = require("react");

const [count, setCount] = useState(0);

//useEffect
useEffect(() => {
    document.title = 'Count is ${count}';
}, [count]);