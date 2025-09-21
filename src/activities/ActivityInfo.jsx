import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useParams } from "react-router";

export default function ActivityInfo() {
  const { token } = useAuth();
  const { id } = useParams();
  const {
    data: activity,
    loading,
    error,
  } = useQuery("/activities/" + id, "activity");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!activity) return <p>Activity not found</p>;

  return (
    <>
      <h2>{activity.name}</h2>
      <p>{activity.creatorName}</p>
      <p>{activity.description}</p>
      {token && <DeleteButton activity={activity} token={token} />}
    </>
  );
}

function DeleteButton({ activity, token }) {
  const navigate = useNavigate();
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", "/activities/" + activity.id, ["activities"]);

  const onDeleteInfo = async () => {
    const success = await deleteActivity();
    if (success) navigate("/activities");
  };

  return (
    <li>
      <p>{activity.name}</p>
      {token && (
        <button onClick={onDeleteInfo}>
          {loading ? "Deleting..." : error ? error : "Delete"}
        </button>
      )}
    </li>
  );
}
