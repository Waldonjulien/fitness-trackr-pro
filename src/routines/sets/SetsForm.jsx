import { useAuth } from "../../auth/AuthContext";
import useQuery from "../../api/useQuery";
import useMutation from "../../api/useMutation";

export default function SetForm({ routineId, syncRoutine }) {
  const { token } = useAuth();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useQuery("/activities", "activities");

  const {
    mutate: createSet,
    loading: createLoading,
    error: createError,
  } = useMutation("POST", "/routine_activities", ["routine-sets"]);

  const tryCreateSet = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const activityId = formData.get("activity");
    const count = formData.get("count");

    try {
      await createSet({
        activityId: parseInt(activityId),
        routineId: parseInt(routineId),
        count: parseInt(count),
      });

      event.target.reset();

      if (syncRoutine) syncRoutine();
    } catch (e) {
      console.error("Error creating set:", e);
    }
  };

  if (activitiesLoading) return <p>Loading activities...</p>;
  if (activitiesError)
    return <p>Error loading activities: {activitiesError}</p>;

  return (
    <>
      <div>
        <h3>Add set</h3>
        <form onSubmit={tryCreateSet}>
          <label>
            Activity:
            <select name="activity" required>
              <option value="">-- Select an activity --</option>
              {activities &&
                activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
            </select>
          </label>

          <label>
            Count:
            <input type="number" name="count" min="1" required />
          </label>

          <button type="submit" disabled={!token || createLoading}>
            {createLoading ? "Adding..." : "Add Set"}
          </button>

          {createError && (
            <output style={{ color: "red" }}>Error: {createError}</output>
          )}
          {!token && <p>Please log in to add sets</p>}
        </form>
      </div>
    </>
  );
}
