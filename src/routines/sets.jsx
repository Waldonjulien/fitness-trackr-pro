import useMutation from "../api/useMutation.js";
import useQuery from "../api/useQuery.js";

function Sets() {
  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useQuery("/activities", "activities");

  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/sets", ["sets"]);

  const addSets = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const activityId = formData.get("activityId");
    const count = formData.get("count");
    add({ activityId: parseInt(activityId), count: parseInt(count) });
  };

  if (activitiesLoading) return <p>Loading activities...</p>;
  if (activitiesError) return <p>Error loading activities</p>;

  return (
    <>
      <h3>Add a set</h3>
      <form onSubmit={addSets}>
        <label>
          Activity
          <select name="activityId" required>
            <option value="">-- select an activity --</option>
            {activities &&
              activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
          </select>
        </label>

        <label>
          Count
          <input type="number" name="count" required />
        </label>

        <button type="submit">{loading ? "Adding..." : "Add set"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}

export default Sets;

// sets no reading api and mutation : need to get activitieds to displey in dropdown
