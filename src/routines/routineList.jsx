import { Link } from "react-router";
import useQuery from "../api/useQuery";

function RoutineList() {
  const { data: routines, loading, error } = useQuery("/routines", "routines");

  if (loading || !routines) return <p>Loading... </p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {routines.map((routine) => (
        <RoutineListItem key={routine.id} routine={routine} />
      ))}
    </ul>
  );
}

function RoutineListItem({ routine }) {
  return (
    <li>
      <Link to={"/routinres/" + routine.id}>
        <h2>{routine.name}</h2>
        <p>{routine.description}</p>
      </Link>
    </li>
  );
}

export default RoutineList;
