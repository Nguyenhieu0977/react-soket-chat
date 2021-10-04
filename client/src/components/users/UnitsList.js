import React from 'react';
import TreeView from 'treeview-react-bootstrap';


function UnitsList() {
    const data = [
        {
            text: "Parent 1",
            nodes: [
                {
                    text: "Child 1",
                    nodes: [
                        {
                            text: "Grandchild 1"
                        },
                        {
                            text: "Grandchild 2"
                        }
                    ]
                },
                {
                    text: "Child 2"
                }
            ]
        },
        {
            text: "Parent 2"
        }
    ];

    return (
        <>
            <TreeView data={data} levels={5}/>
        </>
    );
}

export default UnitsList
