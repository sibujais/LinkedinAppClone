import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { useEffect } from "react";
import { getUserAuth } from "./actions";

function App(props) {

  useEffect(()=>{
    props.getUserAuth();
  },[]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/home" element={
            <>
              <Header/>
              <Home/>
            </>}>
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
}
const mapStateToProps=(state)=>{
  return {};
}

const mapDispatchToProps=(dispatch)=>({
  getUserAuth : () => dispatch(getUserAuth()),
});
export default connect(null, mapDispatchToProps)(App);
