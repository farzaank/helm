import helmHero from "@/assets/helmhero.png";
import { Link } from "react-router-dom";
import MiniLeaderboard from "./MiniLeaderboard";

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row px-6 py-14">
      {/* Left side content */}
      <div className="flex-1 w-1/2 p-4 flex flex-col justify-center">
        {" "}
        {/* Added flex and justify-center */}
        <div className="flex justify-start">
          <h1 className="text-4xl mb-4 mx-2 mt-2">
            <strong>
              A holistic framework for evaluating foundation models.
            </strong>
          </h1>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex justify-center ">
            <img
              src={helmHero}
              alt="HELM Hero"
              className="object-cover w-full h-full"
              style={{ width: "334px", height: "315px" }}
            />
          </div>
        </div>
      </div>

      {/* Right side image */}
      <div className="w-1/2 mx-4 md:mt-6 px-12 py-6">
        {" "}
        {/* Added mx-4 for horizontal margin */}
        <div className="flex justify-start py-4 px-20">
          <div>
            <MiniLeaderboard></MiniLeaderboard>
            <div className="flex justify-end mt-6 ml-4">
              <Link to="leaderboard">
                <button className="px-6 btn btn-grey rounded-md">
                  <body>View Leaderboard</body>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
