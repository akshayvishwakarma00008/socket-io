import Robot from "../assets/robot.gif";
export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={Robot} alt="" className="h-80" />
      <h1>
        Welcome, <span>Hello User!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}

