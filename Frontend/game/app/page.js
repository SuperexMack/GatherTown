
export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">

        <div className="w-[400px] h-auto p-6 bg-slate-100 shadow-2xl shadow-slate-400 rounded-lg flex flex-col items-center space-y-8">
          <h1 className="mt-4 font-bold text-[25px]">Room Details</h1>
          <input className="w-[80%] border-2 rounded-lg border-yellow-400 p-2" placeholder="John Doe"></input>
          <input className="w-[80%] border-2 rounded-lg border-yellow-400 p-2" placeholder="Room Name"></input>
          
          <button className="w-[80%]  bg-blue-600 p-2 rounded-lg font-bold text-white">Create Room</button>
          <button className="w-[80%]  bg-blue-600 p-2 rounded-lg font-bold text-white">Join Room</button>

        </div>

      </div>
    </>
  );
}
