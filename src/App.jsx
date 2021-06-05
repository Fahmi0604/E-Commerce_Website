import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // Redirect
} from "react-router-dom";
import foto from './FAHMI.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Televisi.css';
import 'font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux'
import Login from './component/login/Login'
import Televisi from './component/televisi/Televisi'
import Keranjang from './component/keranjang/Keranjang'
import SignUp from './component/login/Signup'
import firebase from 'firebase'
import firebaseConfig from './config'
import ExampleCRUD from './component/login/ExampleCRUD'

// var coba = 0;

class App extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    this.state = {
        listKeranjang: [],
        user: {}
    }
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({
                user
            })

            this.ambilDataDariServerAPI(user.uid);

            console.log("User adalah : " + user.email)
        }
        else {
            this.setState({
                user: null
            })
        }
    })
}

  ambilDataDariServerAPI = (uid) => {
    // this.authListener();
    // console.log("uid: "+this.state.user.uid)
    const userRef = firebase.database().ref('keranjang/' + this.state.user.uid);
    userRef.once('value', (snapshot) => {
        let newUserState = [];
        let coba = 0;
        snapshot.forEach(data => {
            const dataVal = data.val()
            newUserState.push({
                id: data.key,
                nama: dataVal.nama,
                harga: dataVal.harga,
                gambar: dataVal.gambar,
                stok: dataVal.stok,
                qty: dataVal.qty
            })
            coba += dataVal.qty
            console.log('Coba : '+ coba)
            this.props.handleKeranjang(coba)
        })
        this.setState({
            listKeranjang: newUserState
        })
        console.log(this.state);
    })
  }

  componentDidMount() {
    this.authListener();
    this.ambilDataDariServerAPI();
  }

  render() {
    console.log(this.state)
    return (
      <Router>
        <div>
  
          <ul className="menu">
            <img src="https://media.wired.com/photos/5ed7d5b17f41315c30f0d5d1/master/w_2611,h_512,c_limit/5017.png" alt="Gambar" />
            <li>
              <Link to="/login" ><i className="fa fa-user-circle"></i></Link>
            </li>
            <li>
              <Link to="/keranjang" ><i className="fa fa-shopping-cart"></i><span id="cart">{this.props.tOrder}</span></Link>
            </li>
            <li>
              <Link to="/about" ><span>About</span></Link>
            </li>
            {/* <li>
              <Link to="/keranjang" ><span>Keranjang</span></Link>
            </li> */}
            <li>
              <Link to="/list-product" ><span>List Produk</span></Link>
            </li>
            <li>
              <Link to="/" ><span>Home</span></Link>
            </li>
          </ul>
  
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/list-product">
              <Products />
            </Route>
            <Route path="/keranjang">
              <Keranjangs />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/example">
              <ExampleCRUD />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


// function App() {
//   // console.log(this.props)
  
// }

function Home() {
  return (
    <div className="carousel-televisi">
      {/* <img src={apple} id="img-bg" /> */}
      <Carousel showStatus={false} showIndicators={true} showThumbs={false} infiniteLoop={true} autoPlay={true}>
        <div>
          <img src="https://th.bing.com/th/id/Rcf2edea17ff2ac288b4a2650d44a33cd?rik=DwXd4W6YI8GpIQ&riu=http%3a%2f%2fblog.bestbuy.ca%2fwp-content%2fuploads%2f2020%2f05%2f2020-The-Terrace_Key-Visual_Print-H.jpg&ehk=z9SigibUYSXgo0PScIj2XrKt4%2fhwUs1V8yIgyAAEA6A%3d&risl=&pid=ImgRaw" alt="gambar" />
          {/* <p className="legend">Macbook Pro 2020</p> */}
        </div>
        <div>
          <img src="https://www.tvadvertisingmedia.com/wp-content/uploads/2018/01/ondemandtest1.png" alt="gambar" />
          {/* <p className="legend">Macbook Pro 2019</p> */}
        </div>
        <div>
          <img src="https://thegadgetflow.com/wp-content/uploads/2020/05/Samsung-The-Terrace-QLED-4k-Outdoor-Smart-TV-04-1200x675.jpg" alt="gambar" />
          {/* <p className="legend">Macbook Pro 2018</p> */}
        </div>
      </Carousel>
      <center><p id="promo-t1">PROMO TERBARU</p></center>
      <center><p id="promo-t2">Dapatkan info promo terbaru disini</p></center>

      <ul className="menu-promo">
        <li><a id="recomend" href="#recomended"> Our Recommendations </a></li>
        <li><a href="#Hdtv">HD Tv</a></li>
        <li><a href="#FHDtv">Full HD Tv</a></li>
        <li><a href="#Smarttv">Smart Tv</a></li>
      </ul>

      <div className="promo-content">
        <div className="column">
          <p id="label-1">POPULAR</p>
          <div className="img-promo">
            <img src="https://images.samsung.com/is/image/samsung/id-qledtv-q95t-qa75q95takxxd-frontsilver-thumb-234256690?$160_160_PNG$" alt="gambar" />
          </div>
          <center><p className="nama-promo">75 Q95T QLED Smart 4K TV (2020)</p></center>
          <center><p className="detail-promo">Enjoy Special Offers! Free Air Purifier AX34 and CashBack*</p></center>
          <button className="btn btn-sm btn-buy">Buy Now</button>
        </div>
        <div className="column">
          <p id="label-2">TERLARIS</p>
          <div className="img-promo">
            <img src="https://images.samsung.com/is/image/samsung/id-fhd-t5500-ua43t6500akxxd-frontblack-thumb-229359103?$160_160_PNG$" alt="gambar" />
          </div>
          <center><p className="nama-promo">43 T6500 FHD Smart TV 2020</p></center>
          <center><p className="detail-promo">Free Samsung Soundbar Q70T*</p></center>
          <button className="btn btn-sm btn-buy">Buy Now</button>
        </div>
        <div className="column">
          <p id="label-3">PRE-ORDER</p>
          <div className="img-promo">
            <img src="https://images.samsung.com/is/image/samsung/id-qled-tv-q800t-qa82q800takxxd-frontsilver-thumb-223783578?$160_160_PNG$" alt="gambar" />
          </div>
          <center><p className="nama-promo">82 Q800T QLED 8K Smart TV (2020)</p></center>
          <center><p className="detail-promo">Get 15% OFF</p></center>
          <button className="btn btn-sm btn-buy">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

const About = () => {
  return (
    <div className="About">
      {/* <center><h2>Biodata</h2></center> */}
      <div id="bio">
        <p id="p-1">Hello,I'm</p>
        <p id="p-2">Fahmi Firmansyah</p>
        <p id="p-3">Teknik <p id="p-3-2">Informatika</p></p>
        <p id="p-4">kelas TI-3H</p>
        <p id="p-5">I am a student majoring in Information Technology from the Malang State Polytechnic campus who has the ambition to create my own startup.</p>
      </div>
      <img src={foto} alt="gambar" />
      <div id="kotak" />
    </div>
  );
}

function Products() {
  return (
    <div>
      <Televisi />
    </div>
  )
}

function Keranjangs() {
  return (
    <div>
      <Keranjang />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    tOrder: state.totalOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleKeranjang: (cek) => dispatch({type: 'ADD_ORDER', newValue: cek})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
