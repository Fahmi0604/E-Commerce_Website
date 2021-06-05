import React, { Component } from 'react'
import firebase from 'firebase';
import firebaseConfig from '../../config'
// import Post from './Post'

export default class Forgot extends Component {
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            id: '',
            nama: '',
            tempat: '',
            kondisi: false,
            dataWisata: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    tambahData = () => {
        if (this.state.kondisi === false) {
            firebase.database().ref('DTW').push({
                nama: this.state.nama,
                tempat: this.state.tempat
            })

            this.setState({
                id: '',
                nama: '',
                tempat: '',
                data: {},
                data2: []

            })

            alert('Data Berhasil ditambahkan');
        } else {
            firebase.database().ref('DTW/'+this.state.id).set({
                nama: this.state.nama,
                tempat: this.state.tempat
            })

            this.setState({
                id: '',
                nama: '',
                tempat: '',
                kondisi: false
            })
        }
    }

    hapusData = (id) => {
        firebase.database().ref('DTW/' + id).remove();
    }

    getData = () => {
        firebase.database().ref('DTW')
            .on('value', (snapshot) => {
                let newData = [];
                snapshot.forEach(data => {
                    const dataVal = data.val();
                    newData.push({
                        id: data.key,
                        nama: dataVal.nama,
                        tempat: dataVal.tempat
                    })
                })
                this.setState({
                    dataWisata: newData
                })
            })
    }

    updateData = (id) => {
        firebase.database().ref('DTW/' + id).on('value', (snapshot) => {
            const data = snapshot.val();
            this.setState({
                id: snapshot.key,
                nama: data.nama,
                tempat: data.tempat,
                kondisi: true
            })
        })
    }

    render() {
        return (
            <div style={{ width: "300px" }}>
                <label htmlFor="nama">Nama</label>
                <input name="nama" type="text" onChange={this.handleOnChange} value={this.state.nama} /><br />
                <label htmlFor="tempat">Tempat</label>
                <input name="tempat" type="text" onChange={this.handleOnChange} value={this.state.tempat} /><br />
                <button onClick={this.tambahData}>Simpan</button>
                <br /><br /><br />
                <p>List Data</p>
                {this.state.dataWisata.map(data => {
                    return (
                        <Post
                            id={data.id}
                            nama={data.nama}
                            tempat={data.tempat}
                            hapusData={this.hapusData}
                            updateData={this.updateData}
                        />
                    )
                })}
            </div>
        )
    }
}

const Post = (props) => {
    return (
        <div style={{ backgroundColor: "blue", color: "white", }}>
            <p style={{ padding: "10px" }}>Nama:{props.nama}</p>
            <p style={{ padding: "10px" }}>Tempat:{props.tempat}</p>
            <button onClick={() => props.hapusData(props.id)}>Hapus</button>
            <button onClick={() => props.updateData(props.id)}>Update</button>
        </div>
    )
}