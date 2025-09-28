import { useAuth } from "../auth/AuthContext";
import RoutineList from "./routineList";
import { AddRoutineForm } from "./Routines";

function RoutinePage() {
  const { token } = useAuth();

  return (
    <>
      <h1>Routines</h1>
      <RoutineList />
      {token && <AddRoutineForm />}
    </>
  );
}

export default RoutinePage;
