import React from 'react';

const Notification = ({ text, isError }) => text ? (
    <div className={['notification', isError ? 'failure' : 'success'].join(' ')}>
        {text}
    </div>
) : null;

export default Notification;