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
    history:[], //{id,l1,l2,l3,date}
    symbols:[ "♠", '♥', '♦', '♣'],
    jackpot:'♠',
    db:{

    }
  }
  componentDidMount(){
    const state = localStorage.getItem("state");
    this.setState(JSON.parse(state));
  }
  componentDidUpdate(){
    localStorage.setItem("state",JSON.stringify(this.state));
  }
  render() { 
    const {user,balance,isLoggedIn,game_open,symbols,jackpot,history}= this.state;
    const {handleGameClose,Login,Logout,handleGamePlay,decreaseBalance,increaseBalance} = this;
    return <div>
      <NavBar Login={Login} Logout={Logout} user={user} balance={balance} isLoggedIn={isLoggedIn} />
      <Body history={history} handleGamePlay={handleGamePlay} />
      <Game balance={balance} increaseBalance={increaseBalance}  decreaseBalance={decreaseBalance} jackpot={jackpot} symbols={symbols} gameOpen={game_open} handleGameClose={handleGameClose}/>
    </div>;
  }
  
  Login = (email,username,password)=>{
    const {db} = this.state;
    if(db[username]){
      if(db[username].password!==password){
        alert("Wrong Password ");
        return
      }
      //if existing user in local db
      this.setState({
        isLoggedIn:true,
        user:username,
        balance:db[username].balance,
        history:db[username].history      
      });
    }else{
      //create new user
      db[username] = {
        user:username,
        balance:this.state.balance || 9.99,
        history:this.state.history || [],
        email,
        password      
      }
    }
    this.setState({
      isLoggedIn:true,
      user:username,
      balance:db[username].balance,
      history:db[username].history,  
      db    
    });
  }
  decreaseBalance = (amount,cb,{l1,l2,l3}) =>{
    if((this.state.balance-amount)<0){
      alert("InSufficient Funds");
      this.setState({game_open:false});
      return
    }else{
      const history_item = {
        id:( this.state.history.length+1),
        l1,l2,l3,
        date: (new Date().toLocaleString())
      };
      
      this.setState({
        history:[...this.state.history,history_item],
      });  
      console.log(this.state.balance,amount)
      this.setState({
        balance : (this.state.balance - amount).toFixed(2)
      },cb);
      if(this.state.user){
        const { db } = this.state;
        db[this.state.user].balance = (this.state.balance - amount).toFixed(2);
        db[this.state.user].history = [...this.state.history,history_item]; 
        this.setState({db})
      }
    }
  
  }
  increaseBalance = (amount) =>{
    this.setState({
      balance : parseFloat(this.state.balance)+amount
    });
    if(this.state.user){  
      const { db } = this.state;
      db[this.state.user].balance = parseFloat(this.state.balance)+amount;
      this.setState({db})
    }
  }
  Logout = () =>{
    this.setState({
      isLoggedIn:false,
      user:null,
      balance:0,
      history:[]
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
