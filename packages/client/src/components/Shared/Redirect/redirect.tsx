import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/redirect.css";

interface RedirectStateProps {
  name: string;
}
export const Redirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = (location.state as RedirectStateProps)?.name;

  const navigateToSearch = () => {
    navigate("/");
  };
  return (
    <>
      <h1 className="heading">{name}</h1>
      <button className="back-button" onClick={navigateToSearch}>
        Back to Search
      </button>
    </>
  );
};
