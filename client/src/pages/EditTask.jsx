import { useParams, Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { editANote, getANote } from "../api/note";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAuth } from "../store";
import { DataSpinner } from "../components/Spinner";
import { ChevronLeft } from "lucide-react";

export default function EditTask() {
  const { noteId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getANote(noteId, token);
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
  }, [noteId, token]);

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("tag", data.tag);
    }
  }, [data, setValue]);

  if (loading) {
    return <DataSpinner />;
  }

  const submitForm = async (formData) => {
    try {
      const res = await editANote(noteId, formData, token);
      if (res.status === 200) {
        toast.success(res.data.msg);
        navigate("/my-task");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "An error occured while trying to create your note"
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-600">{error}</p>}
      <Link className="flex gap-2 items-center mt-10" to="/my-task">
        <ChevronLeft />
        <h1 className="font-semibold text-xl">Edit Task</h1>
      </Link>
      <form className="mt-5" onSubmit={handleSubmit(submitForm)}>
        <fieldset className="fieldset bg-base-200 p-4 rounded-lg">
          <legend className="fieldset-legend text-lg text-gray-500">
            Task title
          </legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Enter task title"
            {...register("title", { required: true })}
          />
          {errors?.title && (
            <p className="text-xs text-red-600">Title is required</p>
          )}
        </fieldset>

        <fieldset className="fieldset bg-base-200 p-4 rounded-lg">
          <legend className="fieldset-legend text-lg text-gray-500">
            Description
          </legend>
          <textarea
            className="textarea textarea-md w-full"
            placeholder="Describe task"
            rows={8}
            {...register("description", { required: true })}
          ></textarea>
          {errors?.description && (
            <p className="text-xs text-red-600">Descrption is required</p>
          )}
        </fieldset>

        <fieldset className="fieldset bg-base-200 p-4 rounded-lg">
          <legend className="fieldset-legend text-lg text-gray-500">
            Tags
          </legend>
          <select
            className="select w-full"
            defaultValue=""
            {...register("tag", { required: true })}
          >
            <option disabled={true} value="">
              Select a tag
            </option>
            <option value="urgent">Urgent</option>
            <option value="important">Important</option>
          </select>
          {errors?.tag && (
            <p className="text-xs text-red-600">Please select a tag</p>
          )}
        </fieldset>
        <button
          className="mt-8 btn btn-lg w-full bg-[#974FD0] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Done"
          )}
        </button>
      </form>
    </div>
  );
}
