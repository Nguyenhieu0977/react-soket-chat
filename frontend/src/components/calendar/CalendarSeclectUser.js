import React, { useState } from "react";
import ColumnSelect from 'react-column-select'


function CalendarSelectUser(props) {

    const {user_list, handleUserSelect} = props

    const [selected, setSelected] = useState([])

    // console.log(user_list)
   
    const onChange = (values) => {
        
        setSelected(values)
        handleUserSelect(values)

    }
    // console.log(selected)
    return (
        <>
        {/* {user_list.map(x=>{return(<li key={x.value}>{x.value}</li>)})} */}
            <ColumnSelect
            // defaultValue={hobbies}
            options={user_list}
            onChange={onChange}
            leftHeader='Chọn danh sách thành viên'
            rightHeader='Danh sách thành viên được chọn'
            backgroundColor='#fff'
            isSearchable
            searchFocusBorderColor=""
            theme={{
                buttonBgColor: '#CBD5E0',
                columnBgColor: '#CBD5E0',
                columnBorderColor: '#CCC',
                headerBgColor: '#d6b1ff',
                searchFocusBorderColor: '',
                textColor: '#000000',
                headerBgColor: '#fff',
            }}
        />
        </>
    )
}

export default CalendarSelectUser
