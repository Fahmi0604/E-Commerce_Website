import { IonItemOptions, IonItemSliding, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, IonText, IonAvatar, IonLabel, IonItemOption, IonButton, IonIcon, IonInput, IonToast, IonButtons, IonMenuButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
import { ellipsisHorizontal } from 'ionicons/icons';

const Register: React.FC = () => {

    useEffect(() => {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

    }, [])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState('');

    const handleChangeUsername = (e: any) => {
        setUsername(e.target.value);
        console.log(username);
    }

    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
        console.log(password);
    }

    const handleChangeCPassword = (e: any) => {
        setCPassword(e.target.value);
        console.log(cpassword);
    }

    function register() {

        firebase.auth().createUserWithEmailAndPassword(username, password).then((u) => {
            console.log(u);
            setMsg('Berhasil Register');
            setShowToast(true);
            setUsername('');
            setPassword('');
            setCPassword('');

        }).catch((error) => {
            setMsg(error);
            setShowToast(true);
        })

    }

    return (
        <IonPage >
            <IonHeader>
                <IonToolbar>
                    <IonButtons color="transparent" slot="start">
                        <IonMenuButton color="primary"></IonMenuButton>
                    </IonButtons>
                    <IonButtons slot="primary">
                        <IonButton>
                            <IonIcon icon={ellipsisHorizontal} color="primary" />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonInput style={{ border: "0.5px solid #212121", borderRadius: "5px", marginBottom: "2vh" }} type="text" name="username" placeholder="Enter Username" onIonChange={handleChangeUsername} value={username} />
                <IonInput style={{ border: "0.5px solid #212121", borderRadius: "5px", marginBottom: "2vh" }} type="password" name="password" placeholder="Enter Password" onIonChange={handleChangePassword} value={password} />
                <IonInput style={{ border: "0.5px solid #212121", borderRadius: "5px", marginBottom: "2vh" }} type="password" name="cpassword" placeholder="Enter Confirm Password" onIonChange={handleChangeCPassword} value={cpassword} />
                <IonButton expand="full" onClick={register}>
                    Register
                </IonButton>
                <p>
                    Alredy have an account? <Link to="/login">Login</Link>
                </p>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={msg}
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
};

export default Register;
