import React from 'react'

export default function Welcome(props) {
    return (
        <div className="User">
        {/* <div></div> */}
        {/* {
            this.state.user.photoURL ? (<img src={this.state.user.photoURL} alt="gambar" style={{width:"100px", height:"100px"}} />) : (<img src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png" alt="gambar" style={{width:"100px", height:"100px", marginTop:"20vh"}} />)
          } */}
        <center><h1>Welcome {props.userEmail}</h1></center>
        <br /><br />
        <center><button onClick={props.logout}>Logout</button></center>
      </div>
    )
}
