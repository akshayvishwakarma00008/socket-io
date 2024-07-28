import Robot from "../assets/robot.gif";
export default function Welcome({currentUserDetails}) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[80vh] bg-white shadow-md bg-clip-border rounded-xl mt-10">
            <img src={Robot} alt="" className="h-80" />
            <h1>
                Welcome, <span>{currentUserDetails?.username}</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    );
}

