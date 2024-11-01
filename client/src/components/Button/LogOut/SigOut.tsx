import { Button } from "@mantine/core";
import { logout } from "../../../services/Auth/auth";

export default function SigOut() {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleLogout}>SigOut</Button>;
}
