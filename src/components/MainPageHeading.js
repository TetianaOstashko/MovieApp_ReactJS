import React from 'react';

const MainPageHeading = (props) => {
    return (
        <div className='col'>
            <h1 className='text-primary-emphasis'>{props.heading}</h1>
        </div>
    );
};

export default MainPageHeading;

