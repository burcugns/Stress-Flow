import { useAuth } from "../context/Authcontext";
import Sidebar from "../components/SideBar";
import MainContent from "../components/MainContent";

function Userpage() {
  const { currentUser } = useAuth();

  return (
    <div className="flex min-h-screen pt-20">
      <Sidebar currentUser={currentUser} />
      <MainContent />
    </div>
  );
}

export default Userpage;
