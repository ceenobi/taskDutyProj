import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { createNote } from "../api/note";
import { toast } from "sonner";
import { useAuth } from "../store";

export default function NewTask() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { token } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    try {
      const res = await createNote(formData, token);
      if (res.status === 201) {
        toast.success(res.data.msg);
        reset();
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
      <Link className="flex gap-2 items-center mt-10" to="/">
        <ChevronLeft />
        <h1 className="font-semibold text-xl">New Task</h1>
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
