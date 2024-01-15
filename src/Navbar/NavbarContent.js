
function NavbarContent(props) {
  return (
    <div className='col bg-purple-dark ms-2 mb-3 p-lg-3 py-3 d-flex justify-content-center'>
      <a className="text-decoration-none" href={props.Link}> 
        <h3 className='text-white text-center'>{props.Title}</h3>
      </a>
    </div>
  );
}

export default NavbarContent;