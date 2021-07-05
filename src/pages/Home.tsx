import { IonItemOptions, IonItemSliding, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, IonText, IonAvatar, IonLabel, IonItemOption, IonButton, IonIcon, IonInput, IonSlides, IonSlide, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonMenuButton, IonMenu, IonButtons } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useEffect, useState } from 'react';
import './Home.css';

import { star, logIn, settings, ellipsisHorizontal } from 'ionicons/icons'

const arr = [
  {
    name: 'Finn',
    desc: 'Man'
  },
  {
    name: 'Han',
    desc: 'Man'
  },
  {
    name: 'Rey',
    desc: 'Man'
  }
]

// const Home: React.FC = () => {
//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Hello world</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent fullscreen>
//         <h1 style={{ textAlign: "center" }}>Check</h1>
//         <IonList>
//           {arr.map(newArr => (
//             <IonItemSliding key={newArr.name}>
//               <IonItem>
//                 <IonAvatar>
//                   <img src={`https://ionicframework.com/docs/demos/api/list/avatar-${newArr.name.toLowerCase()}.png`} alt="" />
//                 </IonAvatar>
//                 <IonLabel className="ion-padding">
//                   <h2>{newArr.name}</h2>
//                   <h3>{newArr.desc}</h3>
//                 </IonLabel>
//               </IonItem>

//               <IonItemOptions side="end">
//                 <IonItemOption onClick={() => alert("Berhasil Delete")}>
//                   Delete
//                 </IonItemOption>
//               </IonItemOptions>

//             </IonItemSliding>
//           ))}
//         </IonList>
//         {/* <ExploreContainer /> */}
//       </IonContent>
//     </IonPage>
//   );
// };

const Home: React.FC = () => {

  const [input, setInput] = useState<string>('');

  useEffect(() => {
    console.log(input);
  }, [input])

  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  return (

    // <>

    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary"></IonMenuButton>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon icon={ellipsisHorizontal} color="primary" />
            </IonButton>
          </IonButtons>

          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <IonCard>
              <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" />
              <IonCardHeader>
                <IonCardSubtitle>Destination</IonCardSubtitle>
                <IonCardTitle>Madison, WI</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836.
              </IonCardContent>
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonCard>
              <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" />
              <IonCardHeader>
                <IonCardSubtitle>Destination</IonCardSubtitle>
                <IonCardTitle>Madison, WI</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836.
              </IonCardContent>
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonCard>
              <img src="https://ionicframework.com/docs/demos/api/card/madison.jpg" />
              <IonCardHeader>
                <IonCardSubtitle>Destination</IonCardSubtitle>
                <IonCardTitle>Madison, WI</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836.
              </IonCardContent>
            </IonCard>
          </IonSlide>
        </IonSlides>

        <h1>{input}</h1>
        <IonInput style={{ border: "0.25px solid gray", marginBottom: "2vh" }} value={input} onIonChange={(e: any) => setInput(e.target.value)} placeholder="Enter some text" />
        <IonButton expand="block" color="primary" routerLink="/todo">
          <IonIcon slot="start" icon={star} />
          Todo List
        </IonButton>

        <IonButton expand="block" color="primary" routerLink="/login">
          <IonIcon slot="start" icon={logIn} />
          Login
        </IonButton>
        <IonButton expand="block" color="warning" routerLink="/register">
          <IonIcon slot="start" icon={settings} />
          Register
        </IonButton>
      </IonContent>
    </IonPage>

    // </>
  );
};

export default Home;
