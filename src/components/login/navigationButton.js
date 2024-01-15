import { useNavigate } from 'react-router-dom';
import App from "../../App";

const NavigateButton = () => {
    let navigate = useNavigate();

    return (
        <button onClick={() => navigate('/login')}>Go to Login</button>
    );
};
export default App;