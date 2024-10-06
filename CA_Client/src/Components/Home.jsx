// import { toast } from "react-toastify";

const Home = () => {

  return (
    <>
      <div className="w-full h-[89%] bg-white  grid-cols-3 flex justify-center gap-20 mt-20  ">
        <div className=" min-w-80 max-h-60  bg-slate-300 rounded-2xl   ">
          <div className="font-bold text-2xl pl-16 pt-5">
                Current Balance
          </div>
        </div>
        <div className=" min-w-80 max-h-60 bg-slate-300 rounded-2xl  ">
        <div className="font-bold text-2xl pl-24 pt-5">
                Expanses
                
          </div>
        </div>
        <div className=" min-w-80 max-h-60 bg-slate-300 rounded-2xl    ">
        <div className="font-bold text-2xl pl-28 pt-5">
                Budget
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
