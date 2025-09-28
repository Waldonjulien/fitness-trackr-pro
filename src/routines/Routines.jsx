import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useParams, useNavigate } from "react-router";
import Sets from "./sets/Sets.jsx";
import SetsForm from "./sets/SetsForm.jsx";

export default function Routines() {
  const { token } = useAuth();
  const { id } = useParams();

  // Fetch routine data
  const {
    data: routine,
    loading,
    error,
    refetch: syncRoutine,
  } = useQuery("/routines/" + id, "routines");

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error: {error}</p>;

  return (
    <>
      <h2>{routine.name}</h2>
      <p>Goal: {routine.goal}</p>
      <p>Created by: {routine.creatorName}</p>
      {token && <DeleteButton routine={routine} token={token} />}

      <Sets sets={routine.activities || []} syncRoutine={syncRoutine} />

      {token && <SetsForm routineId={id} syncRoutine={syncRoutine} />}
    </>
  );
}

function AddRoutineForm() {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/routines", ["routines"]);

  const addRoutine = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const goal = formData.get("goal");
    add({
      name: name,
      goal: goal,
    });
  };
  return (
    <>
      <h2>Add a new routine</h2>
      <form onSubmit={addRoutine}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Goal
          <input type="text" name="goal" required />
        </label>
        <button type="submit">{loading ? "Adding..." : "Add routine"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}

function DeleteButton({ routine }) {
  const navigate = useNavigate();
  const {
    mutate: deleteRoutine,
    loading,
    error,
  } = useMutation("DELETE", "/routines/" + routine.id, ["routines"]);

  const onDeleteRoutine = async () => {
    const success = await deleteRoutine();
    if (success) navigate("/routines");
  };
  return (
    <div>
      <button onClick={onDeleteRoutine} disabled={loading}>
        {loading ? "Deleting..." : error ? error : "Delete Routine"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}

export { AddRoutineForm };
export { DeleteButton };
