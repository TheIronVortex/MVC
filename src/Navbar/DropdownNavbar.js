import Dropdown from 'react-bootstrap/Dropdown';

function NavbarDropdown() {
  return (
    <>
      <div className='row'>
        <div className='col-auto bg-purple-dark rounded-bottom-right d-flex d-md-none p-3 pb-1'>
          <h1 className='text-white'>SlimStudie</h1>
        </div>
        <div className='col bg-purple-dark d-flex d-md-none p-2 mb-3 ms-1 justify-content-end'>
          <Dropdown>
              <Dropdown.Toggle className='bg-purple-dark btn-nav-dropdown mx-3' style={{fontSize:"20px"}}>
                Menu
              </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href='#' style={{fontSize:"20px"}} className='my-2'>Home</Dropdown.Item>
              <Dropdown.Item href='#' style={{fontSize:"20px"}} className='my-2'>Toetsen</Dropdown.Item>
              <Dropdown.Item href='#' style={{fontSize:"20px"}} className='my-2'>Instructies</Dropdown.Item>
              <Dropdown.Item href='#' style={{fontSize:"20px"}} className='my-2'>Account</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

export default NavbarDropdown;