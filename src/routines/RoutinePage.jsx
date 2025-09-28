import { useAuth } from "../auth/AuthContext";
import RoutineList from "./routineList";
import { AddRoutineForm } from "./Routines";
import SetForm from "./sets/SetsForm";
import Sets from "./sets/Sets";

function RoutinePage() {
  const { token } = useAuth();

  return (
    <>
      <h1>Routines</h1>
      <RoutineList />
      <Sets />
      {token && <AddRoutineForm />}
      {token && <SetForm />}
    </>
  );
}

export default RoutinePage;
