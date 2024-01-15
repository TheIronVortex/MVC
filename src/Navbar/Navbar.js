import NavbarDropdown from "./DropdownNavbar";
import NavbarContent from "./NavbarContent";

function Navbar() {
  return (
    <>
      <div className="container-fluid">
        <div className='row d-none d-md-flex mx-n3'>    
          <div className='col bg-purple-dark rounded-bottom-right py-3'>
            <h1 className='text-white text-center'>SlimStudie</h1>
          </div>

          {/*Content Navbar met Props*/}
          <NavbarContent Link={'Home'} Title={'Home'} />
          <NavbarContent Link={'#'} Title={'Toetsen'} />
          <NavbarContent Link={'#'} Title={'Instructies'} />

          {/*Plaats tussen Instructies en Account*/}
          <div className='col-xxl-3 col-lg d-lg-flex d-none bg-purple-dark ms-2 mb-3 p-lg-3'>
          </div>

          {/*Login Button*/}
          <NavbarContent Link={'Logout'} Title={'Logout'} />

        </div>
    
        {/*Alternatieve Navbar voor klein venster*/}
        <NavbarDropdown />
      </div>
    </>
  );
}

export default Navbar;