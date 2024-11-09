import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import SigOut from "../../components/Button/LogOut/SigOut";

const Home = () => {

  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();

  return <>Home Page


  {isAuth ? <SigOut /> : <Button onClick={() => navigate("/login")}>Login</Button>}
    
  </>;

};

export default Home;
