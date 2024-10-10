import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="w-screen h-screen   ">
        <nav className="w-full h-20  bg-lime-600 flex items-center justify-between px-4 md:px-28 font-bold border-black border-y-2  ">
          <div className="font-black text-3xl ">
            <NavLink className="text-white hover:text-gray-300">Personalized_CA</NavLink>
          </div>

          <ul className="flex gap-4">
            {/* <li>
              <NavLink className="text-white hover:text-stone-950 " to="/home">
                Home
              </NavLink>
            </li> */}
             <li>
              <NavLink className="text-white hover:text-stone-950" to="/Insert">
                +Butget
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-white hover:text-stone-950" to="/Display">
                +Expense
              </NavLink>
            </li>
            
            <li>
              <NavLink className="text-white hover:text-stone-950" to="/Search">
                Ai_Assistant
              </NavLink>
            </li>
                
            <li>
              <NavLink className="text-white hover:text-stone-950" to="/profile">
                Profile
              </NavLink>
            </li>
            
          </ul>
        </nav>
        
        <Outlet />

      </div>
    </>
  );
};

export default Layout;
