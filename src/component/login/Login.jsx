import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../config';
import Welcome from './Welcome';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '50px 100px 50px 100px'
  }
};

Modal.setAppElement('#root');

class Login extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.forgotPassword = this.forgotPassword.bind(this);
    // this.signup = this.signup.bind(this);
    this.state = {
      showModal: false,
      emailForgot: "",
      email: "",
      password: "",
      user: {}
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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

  componentDidMount() {
    this.authListener();
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log(u)
    }).catch((err) => {
      console.log(err);
      alert(err);
      this.setState({
        email: '',
        password: ''
      })
    })
  }

  signup(e) {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log(u)
    }).catch((err) => {
      console.log(err);
    })
  }

  onLoginGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        // var user = result.user;

      }).catch((error) => {
        console.log(error)
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }

  logout() {
    firebase.auth().signOut();
    window.location.reload();
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  forgotPassword = (Email) => {
    firebase.auth().sendPasswordResetEmail(Email)
      .then(function () {
        alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
      })
  }

  render() {
    return this.state.user ? (
      <Welcome logout={this.logout} userEmail={this.state.user.email} />
    ) : (
      <div className="form">
        <div className="login">
          <center><p id="login-title">Masuk ke Samsung<br /> Account Anda</p></center>
          <form>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            /> <br />
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
              id="password"
              placeholder="Password"
              value={this.state.password}
            /> <br /><br />
            <center><button className="btn-login" onClick={this.login}>Login</button></center><br />
            <center><a href="/signup" className="btn-signup" >Signup</a></center>
            <br /><br />
            <center><a href="forgot" onClick={this.handleOpenModal} style={{ cursor: "pointer" }} type="button" >Lupa kata sandi ?</a></center>
            <Modal
              // className="modal"
              // overlayClassName="overlay"
              style={customStyles}
              isOpen={this.state.showModal}
              contentLabel="onRequestClose Example"
            >
              <h2>Reset Password</h2>
              <p style={{ textAlign: "center" }}>Enter your email address</p>
              <input id="input-email-modal" type="text" onChange={this.handleChange} name="emailForgot" placeholder="Enter email address" /><br />
              <button id="btn-reset-modal" onClick={() => this.forgotPassword(this.state.emailForgot)}>Reset</button>
              <button id="btn-close-modal" onClick={this.handleCloseModal}>X</button>
            </Modal>
            {/* <center><p style={{marginTop: -30}}>atau</p></center> */}

            {/* <center><button className="btn-login-g" onClick={this.onLoginGoogle} > 
            <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
              alt="logo" style={{width: 25, backgroundColor: "white", padding: 4}}/>
            Masuk dengan Google 
            </button></center> */}
          </form>
        </div>
      </div>
    )
  }
}


export default Login;