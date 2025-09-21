import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useParams, useNavigate } from "react-router";
function Routines() {
  const { token } = useAuth();
  const { id } = useParams();
  const {
    data: routine,
    loading,
    error,
  } = useQuery("/routines/" + id, "routines");

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error</p>;

  return (
    <>
      <h2>{routine.name}</h2>
      <p>{routine.goal}</p>
      <p>{routine.creatorName}</p>
      {token && <DeleteButton routine={routine} token={token} />}
      <AddRoutineForm />
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

function DeleteButton({ routine, token }) {
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
    <li>
      <p>{routine.name}</p>
      {token && (
        <button onClick={onDeleteRoutine} disabled={loading}>
          {loading ? "Deleting..." : error ? error : "Delete"}
        </button>
      )}
    </li>
  );
}

export { AddRoutineForm };
export default Routines;
export { DeleteButton };
