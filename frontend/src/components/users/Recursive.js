import React from 'react'
import { NavLink, withRouter } from "react-router-dom";

function Recursive(props) {

    const {item, children} = props
    const uId=item.id
    const Test =(id) =>{
        
        
    }


    let childitems = null;
    if (children) {
        childitems = children.map((childitem, index) => {
            return (
                <Recursive item={childitem} children={childitem.children} key={index} />
            )
        })
    }
    return (
        <li key={uId} style={{cursor: 'pointer'}}>
            
            <NavLink to={`/user-create/${uId}/`} activeStyle={{color:"green"}}>{item.unit_name}</NavLink>
            {childitems ? <ul >{childitems}</ul> : null}
        </li>

    )
}

export default withRouter(Recursive)
