import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [])

  return (
    <>
      <h1>root</h1>
    </>
  );
}

export default App;
