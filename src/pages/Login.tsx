import {
    IonItemOptions,
    IonItemSliding,
    IonContent,
    IonHeader,
    IonItem, IonList,
    IonPage, IonTitle,
    IonToolbar,
    IonText,
    IonAvatar,
    IonLabel,
    IonItemOption,
    IonButton,
    IonIcon,
    IonInput,
    IonToast,
    IonButtons,
    IonMenuButton
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import firebaseConfig from '../firebaseConfig';
import firebase from 'firebase';
import { ellipsisHorizontal } from 'ionicons/icons';

const Login: React.FC = () => {

    useEffect(() => {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

    }, [])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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

    async function login() {

        firebase.auth().signInWithEmailAndPassword(username, password).then((u) => {
            console.log(u);
            setMsg('Berhasil Login');
            setShowToast(true);
            setUsername('');
            setPassword('');

        }).catch((error) => {
            setMsg(error);
            setShowToast(true);
        })

    }

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton autoHide={true} color="primary"></IonMenuButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton>
                            <IonIcon icon={ellipsisHorizontal} color="primary" />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonInput style={{ border: "0.5px solid #212121", borderRadius: "5px", marginBottom: "2vh" }} type="email" name="username" placeholder="Enter Username" onIonChange={handleChangeUsername} />
                <IonInput style={{ border: "0.5px solid #212121", borderRadius: "5px", marginBottom: "2vh" }} type="password" name="password" placeholder="Enter Password" onIonChange={handleChangePassword} />
                <IonButton expand="full" onClick={login}>
                    Login
                </IonButton>
                <p>
                    New here <Link to="register">Register</Link>
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

export default Login;
