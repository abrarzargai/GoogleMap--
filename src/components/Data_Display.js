import React, { useState, useEffect } from 'react';
import { Table, Tag, Space } from 'antd';

const columns = [

    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'image',
        dataIndex: 'photos',
        key: 'name',
        render: (data) => {
           
            console.log("==>",data[0].photo_reference)
            const img = data[0].photo_reference
            let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${img}&key=AIzaSyA_FkaqpqSIEibYl-IqOfosLNYfSOeeo9I`;
  console.log("url====>",url)
            return (
               
                <img src={url} />
                )
        }
    },

];
function Data_Display(props) {

    const [visible, setVisible] = useState([]);
    useEffect(() => {

        setVisible(props.data.data)
        console.log("visible==>", visible)
    });
    return (
        <>
            {visible ?
                (<>
                <h3> Hospital List</h3>
                <Table dataSource={visible} columns={columns} />
                </>
                ) : (<h6>Please search your data </h6>)}

        </>
    )
}

export default Data_Display
