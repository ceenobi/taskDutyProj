import logo from "../assets/logo.svg";

export function LazySpinner() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen relative">
      <img src={logo} alt="logo" />
      <h1 className="text-md text-gray-500 absolute top-[90%]">
        &copy; {new Date().getFullYear()} TaskDuty
      </h1>
    </div>
  );
}

export function DataSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-bars loading-md bg-secondary"></span>
    </div>
  );
}
