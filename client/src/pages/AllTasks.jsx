import { Link } from "react-router";
import { getAllNotes } from "../api/note";
import { useState, useEffect } from "react";
import { useAuth } from "../store";
import { toast } from "sonner";
import { DataSpinner } from "../components/Spinner";
import NoteCard from "../components/NoteCard";

export default function AllTasks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getAllNotes(token);
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.error || error?.message || "An error occured"
        );
        setError("An error occured while trying to get your notes");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [token]);

  if (loading) {
    return <DataSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">All Tasks</h1>
        <Link to="/new-task" className="text-[#974FD0] font-semibold">
          + Add New Task
        </Link>
      </div>
      {error && <p className="text-red-600 text-center mt-6">{error}</p>}
      {/* map over data */}
      {data?.length > 0 ? (
        <>
          {data?.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </>
      ) : (
        <p className="text-3xl mt-6">No task created yet </p>
      )}
    </div>
  );
}