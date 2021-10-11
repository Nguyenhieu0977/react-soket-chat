import React from 'react'
import ReactPaginate from "react-paginate"

const UserPagination = (props) => {
    const { pageCount, onPageChange, counts, pageVisited } = props
    // console.log(pageCount)
    // console.log(onPageChange)
    return (
        <div className="row">
            <div className="col-xs-6">
                <div className="dataTables_info" id="dynamic-table_info" role="status" aria-live="polite">Hiển thị từ { pageVisited + 1} đến { (pageVisited + 10) < counts ? pageVisited + 10 : counts } trong tổng {counts} phòng họp</div>
            </div>
            <div className="col-xs-6">

                <div className="dataTables_paginate paging_simple_numbers" id="dynamic-table_paginate">
                    <ReactPaginate
                        previousLabel={"Về trang trước"}
                        nextLabel={"Trang tiếp theo"}
                        containerClassName={"pagination"}
                        previousClassName={"paginate_button previous"}
                        nextLinkClassName={"paginate_button next"}
                        disabledClassName={"disabled"}
                        activeClassName={"active"}
                        pageCount={pageCount}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserPagination
