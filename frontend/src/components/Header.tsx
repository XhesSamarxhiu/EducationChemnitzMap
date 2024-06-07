
import React from 'react';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header flex justify-between items-center p-4 bg-[#E6F1FE] text-blue">
    <h1 className="text-2xl font-bold sm:text-2xl">Map Application</h1>
    <div className="flex flex-col sm:flex-row">

    <Link to="/login" className="mb-2 sm:mb-0 sm:mr-2">
        <Button  color="success" className="mr-2">
          Log in
        </Button>
      </Link>
    
    </div>
  </header>
);

export default Header;