import { Link, Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonItem, IonList, IonMenu, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Todo from './pages/Todo';
import Login from './pages/Login';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>

    <IonSplitPane contentId="main-content">
      <IonReactRouter>
        <IonMenu side="start" contentId="main-content" >
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Start</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem routerLink="/">Home</IonItem>
              <IonItem routerLink="/login">Login</IonItem>
              <IonItem routerLink="/register">Register</IonItem>
              <IonItem routerLink="/todo">Todo list</IonItem>
              <IonItem>Menu Item</IonItem>
            </IonList>
          </IonContent>
        </IonMenu>


        <IonRouterOutlet id="main-content">
          <Route exact path="/">
            <Home />
            {/* <Todo /> */}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonSplitPane>
  </IonApp>
);

export default App;
