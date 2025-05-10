import { useForm } from "react-hook-form";
import { registerUser } from "../api/auth";
import { toast } from "sonner";
import { useAuth } from "../store";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setAccessToken } = useAuth();

  const submitForm = async (data) => {
    try {
      const res = await registerUser(data);
      if (res.status === 201) {
        toast.success(res.data.msg);
        localStorage.setItem("taskDutyToken", res.data.accessToken);
        setAccessToken(res.data.accessToken);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error || error?.message || "An error occured"
      );
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-[70vh]">
      <h1 className="font-bold text-3xl mt-10">Register for an account</h1>
      <form
        className="w-[85vw] md:w-[350px] border border-gray-200 p-4 mt-6"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="">
          <label htmlFor="username" className="floating-label">
            <span>Username</span>
            <input
              className="input input-lg w-full z-10"
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
          </label>
          {errors?.username && (
            <p className="text-xs text-red-600">Username is required</p>
          )}
        </div>
        <div className="my-4">
          <label htmlFor="email" className="floating-label">
            <span>Email</span>
            <input
              className="input input-lg w-full z-10"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors?.email && (
            <p className="text-xs text-red-600">Email is required</p>
          )}
        </div>
        <div className="my-4">
          <label htmlFor="password" className="floating-label">
            <span>Password</span>
            <input
              className="input input-lg w-full z-10"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </label>
          {errors?.password && (
            <p className="text-xs text-red-600">Password is required</p>
          )}
        </div>
        <button
          className="btn btn-lg w-full bg-[#974FD0] text-white"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
