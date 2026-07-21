import React from 'react';
import OwnersTable from "../components/OwnersTable";

const Owners = () => {
    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1 className='page-title'>Owners</h1>
                <p className='page-subtitle'>Owners management</p>
            </div>
            
            <OwnersTable />
        </div>
    );
}

export default Owners