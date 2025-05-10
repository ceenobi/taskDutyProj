import { SquarePen, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { deleteANote } from "../api/note";
import { useState } from "react";
import { useAuth } from "../store";
import { toast } from "sonner";

export default function NoteCard({ note }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const deleteNoteFn = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteANote(note._id, token);
      if (res.status === 200) {
        toast.success(res.data.msg);
        navigate("/my-task");
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not delete your note");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="my-6 border rounded-md p-3 border-gray-400">
      <div className="flex justify-between items-center">
        <p
          className={`md:text-xl capitalize font-semibold ${
            note.tag === "important" ? "text-green-500" : "text-red-500"
          }`}
        >
          {note.tag}
        </p>
        {user?._id === note.userId && (
          <div className="flex gap-4 md:gap-6">
            <Link to={`/note/${note._id}`}>
              <button className="btn bg-[#974FD0] text-white md:w-[110px]">
                <SquarePen />
                Edit
              </button>
            </Link>
            <button
              className="btn btn-outline border-[#974FD0] text-[#974FD0] md:w-[110px]"
              disabled={isDeleting}
              onClick={deleteNoteFn}
            >
              <Trash2 />
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
      <div className="divider"></div>
      <h1 className="text-xl font-semibold">{note.title}</h1>
      <p>{note.description}</p>
    </div>
  );
}
