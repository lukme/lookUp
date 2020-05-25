import React from 'react';
import { IoMdAirplane } from 'react-icons/io';

const Logo: React.FunctionComponent = () => {
    return (
        <div className='logo'>
            <img src="./logo.png" alt="logo"/>
            <h3 className='logo__text'>LookUp</h3>
        </div>
    )
}

export default Logo;