import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import auth from '../../services/Auth';
import classnames from 'classnames';
const Paginate = (props: any) => {

    const handlePaginate = (val :any) => {
        var queryString = val.url.split('?')[1].split('=')[1];
        props.onPaginate(queryString);
    }



    return (
        <>
            <ul className="pagination mb-0">
                {props.links.length > 0 && props.links.map((val: any, i: any) =>
                    <li key={i} className={classnames({
                        'page-item': true,
                        'active': val.active,
                        'disabled': (val.url == null)
                    })}><button className='page-link btn-sm' onClick={(e) => handlePaginate(val)} dangerouslySetInnerHTML={{ __html: val.label }}></button></li>
                )}
            </ul>
        </>
    )
}

export default Paginate;