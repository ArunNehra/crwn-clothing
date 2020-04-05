import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import "./pages/homepage/homepage.style.scss";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {setcurrentUser } from './redux/user/user.action';

class App extends React.Component {
 
  unsubscribeFromAuth = null;
  componentDidMount() {
    const {setcurrentUser} = this.props;
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.props.setcurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      }

      setcurrentUser(userAuth)
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setcurrentUser: user => dispatch(setcurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
