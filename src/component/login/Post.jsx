import React from 'react'

export default function Post(props) {
        return(
            <div style={{backgroundColor:"blue", color:"white", }}>
                <p style={{padding:"10px"}}>Nama:{props.nama}</p>
                <p style={{padding:"10px"}}>Tempat:{props.tempat}</p>
            </div>
        )
}
