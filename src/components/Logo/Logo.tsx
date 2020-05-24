import React from 'react';
import { IoMdAirplane } from 'react-icons/io';

const Logo: React.FunctionComponent = () => {
    return (
        <div className='logo'>
            <IoMdAirplane
                color='#4392F1'
                size={50}
            />
            <h3 className='logo__text'>LookUp</h3>
        </div>
    )
}

export default Logo;