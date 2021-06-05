import React, { Component } from 'react'
import firebase from 'firebase'
import firebaseConfig from '../../config'
import Post from './Post'

class Televisi extends Component {

    constructor(props) {
      super(props);
  
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app(); // if already initialized, use that one
      }
  
      this.state = {
        listTelevisi: [],
        user: {},
      }
  
    }
  
    authListener() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            user
          })
          console.log("User adalah : " + user.email)
        }
        else {
          this.setState({
            user: null
          })
        }
      })
    }
  
    ambilDataDariServerAPI = () => {
      const userRef = firebase.database().ref('televisi');
      userRef.on('value', (snapshot) => {
        let newUserState = [];
        snapshot.forEach(data => {
          const dataVal = data.val()
          newUserState.push({
            id: data.key,
            nama: dataVal.nama,
            harga: dataVal.harga,
            gambar: dataVal.gambar,
            stok: dataVal.stok
          })
        })
        this.setState({
          listTelevisi: newUserState
        })
        console.log(this.state);
      })
    }
  
    componentDidMount() {
      this.ambilDataDariServerAPI();
      this.authListener();
      console.log(this.state)
    }
  
    componentDidUpdate(prevProps, prevState) {
      console.log(this.state);
    }
  
    getDatabyId = userId => {
      const Ref = firebase.database().ref('televisi/' + userId);

      // let idP, namaP, hargaP, gambarP, stokP;
      // let data2;

      Ref.on('value', (snapshot) => {
        const data = snapshot.val();
        // data2 = data;
        this.writeData(data.id, data.nama, data.harga, data.gambar, data.stok);
        // idP=data.id
        // namaP=data.nama
        // hargaP=data.harga
        // gambarP=data.gambar
        // stokP=data.stok
        console.log(data);
      })

      // Ref.set({
      //   ...data2,
      //   stok: data2.stok -1
      // })
    }
  
    writeData = (userId, name, price, imageUrl, stock) => {
  
      var counter=0;
      // var counter2;
      let uid = this.state.user.uid;
  
      const userRef = firebase.database().ref('keranjang/'+uid+"/"+userId);
      userRef.on('value', function(snapshot) {
          if (snapshot.exists()) {
              const data = snapshot.val();
              counter = data.qty;
              console.log("qty:"+counter);
              // alert(counter);
          }
      })
      // counter2 = counter + 1;

      firebase.database().ref('keranjang/' + uid +"/"+ userId).set({
        id: userId,
        nama: name,
        harga: price,
        gambar: imageUrl,
        stok: stock,
        qty: counter + 1
      });
    }
  
    render() {
      return (
        <div className="post-televisi">
          {
                  /* <div className="form pb-2 border-bottom">
                      <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                  </div> */}
          <center><h2>Daftar Barang</h2></center>
          <div className="tgh">
            {
              this.state.listTelevisi.map(televisi => {
                // let uid = televisi.id;
                return (
                  <Post
                    key={televisi.id}
                    id={televisi.id}
                    nama={televisi.nama}
                    harga={televisi.harga}
                    gambar={televisi.gambar}
                    stok={televisi.stok}
                    // tambahTelevisi={this.handleGetTelevisi} />
                    tambahTelevisi={this.getDatabyId}
                    users={this.state.user ? this.state.user.email : null} />
                )
              })
            }
          </div>
        </div>
      )
    }
  }

export default Televisi;