import { useAuth } from "../../auth/AuthContext";
import useMutation from "../../api/useMutation";

export default function Sets({ sets, syncRoutine }) {
  return (
    <>
      <h3>Sets</h3>
      {sets.length > 0 ? (
        <ul className="sets">
          {sets.map((set) => (
            <Set key={set.id} set={set} syncRoutine={syncRoutine} />
          ))}
        </ul>
      ) : (
        <p>This routine does not have any sets. Add one?</p>
      )}
    </>
  );
}

function Set({ set, syncRoutine }) {
  const { token } = useAuth();

  const {
    mutate: deleteSet,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation("DELETE", `/routine_activities/${set.id}`, ["routines"]);

  const tryDeleteSet = async () => {
    try {
      await deleteSet();
      if (syncRoutine) syncRoutine();
    } catch (e) {
      console.error("Error deleting set:", e);
    }
  };

  return (
    <li>
      <p>
        {set.name} × {set.count}
      </p>
      {token && (
        <button onClick={tryDeleteSet} disabled={deleteLoading}>
          {deleteLoading ? "Deleting..." : "Delete"}
        </button>
      )}
      {deleteError && (
        <p role="alert" style={{ color: "red" }}>
          Error: {deleteError}
        </p>
      )}
    </li>
  );
}
