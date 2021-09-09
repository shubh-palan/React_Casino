import React from 'react';
import Body from './components/Body';
import NavBar from './components/Navbar';
import "./App.css";
import Game from './components/Game';

class App extends React.Component {
  state={
    isLoggedIn:false,
    user:null,
    balance:9.99,
    game_open:false,
    symbols:[ "♠", '♥', '♦', '♣'],
    jackpot:'♠'
  }
  componentDidMount(){
    const state = localStorage.getItem("state");
    this.setState(JSON.parse(state));
  }
  componentDidUpdate(){
    localStorage.setItem("state",JSON.stringify(this.state));
  }
  render() { 
    const {user,balance,isLoggedIn,game_open,symbols,jackpot}= this.state;
    const {handleGameClose,Login,Logout,handleGamePlay,decreaseBalance,increaseBalance} = this;
    return <div>
      <NavBar Login={Login} Logout={Logout} user={user} balance={balance} isLoggedIn={isLoggedIn} />
      <Body handleGamePlay={handleGamePlay} />
      <Game balance={balance} increaseBalance={increaseBalance}  decreaseBalance={decreaseBalance} jackpot={jackpot} symbols={symbols} gameOpen={game_open} handleGameClose={handleGameClose}/>
    </div>;
  }
  
  Login = (user)=>{
    console.log("Logging In");
    this.setState({
      isLoggedIn:true,
      user:user,      
    });
  }
  decreaseBalance = (amount,cb) =>{
    console.log(this.state.balance,amount)
    if((this.state.balance-amount)<0){
      console.log(this.state.balance,amount)
      alert("InSufficient Funds");
      this.setState({game_open:false});
      return
    }else{
      console.log(this.state.balance,amount)
      this.setState({
        balance : (this.state.balance - amount).toFixed(2)
      },cb);
    }
  }
  increaseBalance = (amount) =>{
    console.log(this.state.balance,amount)
    console.log((parseFloat(this.state.balance).toFixed(2) - parseFloat(amount).toFixed(2)));
    this.setState({
      balance : parseFloat(this.state.balance)+amount
    });
  }
  Logout = () =>{
    this.setState({
      isLoggedIn:false
    });  
  }
  handleGameClose = () =>{
    this.setState({
      game_open:false
    });  
  }
  handleGamePlay = () =>{
    this.setState({
      game_open:true
    });  
  }
}
 
export default App;
