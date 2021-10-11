import React, { useState } from "react";
import ColumnSelect from 'react-column-select'


function CalendarSeclectUserEdit(props) {

    const {user_list, handleUserSelect, userEdit} = props

    const [selected, setSelected] = useState([])

    const onChange = (values) => {
        setSelected(values)
        handleUserSelect(values)
    }
    // console.log(selected)
    return (
        <>
        {/* {user_list.map(x=>{return(<li key={x.value}>{x.value}</li>)})} */}
            <ColumnSelect
            defaultValue={userEdit}
            options={user_list}
            onChange={onChange}
            leftHeader='Chọn danh sách thành viên'
            rightHeader='Danh sách thành viên được chọn'
            backgroundColor='#fff'
            // buttonAriaLabel= "Thêm"
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

export default CalendarSeclectUserEdit
