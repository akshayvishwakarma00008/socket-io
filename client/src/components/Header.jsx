import logo from '../assets/message.png'
const Header = () => {
  return (
    <div>
      <div>
        <nav className="bg-white dark:bg-gray-800 ">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center ">
                <a className="flex-shrink-0" href="/">
                  <img
                    className="w-14 h-14"
                    src={logo}
                    alt="chatApp"
                  />
                </a>
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4 text-2xl font-bold">Chat App</div>
                </div>
              </div>
              <div className="block">
                <div className="flex items-center ml-4 md:ml-6"></div>
              </div>
              <div className="flex -mr-2 md:hidden">
                <button className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md dark:text-white hover:text-gray-300 focus:outline-none">
                  <image src="../assets/message.png" height={50} width={50} />
                </button>
              </div>
            </div>
          <div className="md:hidden"></div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
