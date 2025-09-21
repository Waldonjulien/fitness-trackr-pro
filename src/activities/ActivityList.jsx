import { Link } from "react-router";
import useQuery from "../api/useQuery";

/** Shows a list of activities. */
export default function ActivityList() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}

function ActivityListItem({ activity }) {
  return (
    <li>
      <Link to={"/activities/" + activity.id}>
        <h2>{activity.name}</h2>
        <p>{activity.description}</p>
      </Link>
    </li>
  );
}
