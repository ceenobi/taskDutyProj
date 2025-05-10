import { Link } from "react-router";
import hero from "../assets/hero.png";

export default function Home() {
  return (
    <div className="container mx-auto lg:flex justify-between items-center py-4">
      <div className="lg:w-[50%] text-center lg:text-start mt-10 lg:mt-0">
        <h1 className="font-bold text-5xl">
          Manage your Task on <br />{" "}
          <span
            className="text-[#974FD0]
"
          >
            TaskDuty
          </span>
        </h1>
        <p className="my-4 md:w-[70%] mx-auto lg:mx-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
          sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
          tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
          semper porttitor. Nec accumsan.
        </p>
        <Link to="/my-task">
          <button className="btn btn-lg bg-[#974FD0] text-white">
            Go To My Task
          </button>
        </Link>
      </div>
      <div className="lg:w-[50%] p-4">
        <img src={hero} alt="hero-img" className="w-full h-full" />
      </div>
    </div>
  );
}
