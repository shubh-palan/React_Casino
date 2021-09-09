import { Button, Modal } from "@material-ui/core";
import React from 'react';

class Game extends React.Component {
    state={
        lever_one:null,
        lever_two:null,
        lever_three:null,
        
    }
    l1= '?'//this.getRandomSymbol();
    l2 = '?'//this.getRandomSymbol();
    l3 = '?'//this.getRandomSymbol();
    componentDidMount(){
        
        if(this.props.balance < 2){
            this.setState({
                lever_one:'?',
                lever_two:'?',
                lever_three:'?'
            })
        }else{
            this.reset();
        }
    }
    render() { 
        const {gameOpen,handleGameClose} = this.props;
        const {lever_one,lever_two,lever_three} = this.state;
        const {setLeverOne,setLeverTwo, setLeverThree,l1,l2,l3,reset ,debug} = this;
        return <div>
            <Modal
                open={gameOpen}
                onClose={handleGameClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            <div className="paper">
            <h2>Game</h2>
            <div className='card_body'>
                <div className="levers">{lever_one || l1}</div>
                <div className="levers">{lever_two || l2}</div>
                <div className="levers">{lever_three || l3}</div>
            </div>
            <div className="card_body">
                <div><Button color="primary" disabled={lever_one !== null} variant="contained" onClick={setLeverOne} >L1</Button></div>
                <div><Button color="primary"  disabled={lever_two !== null}  variant="contained" onClick={setLeverTwo} >L2</Button></div>
                <div><Button color="primary" disabled={lever_three !== null} variant="contained" onClick={setLeverThree} >L3</Button></div>
            </div>
            <div>
                <Button onClick={debug}>Debug</Button>
                <Button onClick={reset}>Play Again : $2</Button>
            </div>
            </div>
      </Modal>
        </div>;
    }

    reset=()=>{
        if(this.props.balance>=2){
            this.setState({
                lever_one:null,
                lever_two:null,
                lever_three:null   
            });
        }
    }
    debug=()=>{
        this.setState({
            lever_one:this.props.symbols[0],
            lever_two:this.props.symbols[0],
            lever_three:this.props.symbols[0]   
        },this.checkResult);
        // this.checkResult();
    }
    
    getRandomSymbol(){
        let {symbols} = this.props;
        let randIndex = Math.round((Math.random()*(symbols.length-1)));
        return symbols[randIndex];
    }
    setLeverOne = () =>{
        if(this.state.lever_one){
            return
        }
        this.setState({
            lever_one:this.getRandomSymbol()
        }, this.checkResult);
     
    } 
    setLeverTwo = ( ) =>{
        if(this.state.lever_two){
            return
        }
        this.setState({
            lever_two:this.getRandomSymbol()
        }, this.checkResult);
     
    } 
    setLeverThree = ( ) =>{
        if(this.state.lever_three){
            return
        }
        this.setState({
            lever_three:this.getRandomSymbol()
        }, this.checkResult);

    } 
    checkResult = () =>{
        console.log("checkResult");
        console.log(this.state);
        const l1 = this.state.lever_one;
        const l2 = this.state.lever_two;
        const l3 = this.state.lever_three;
        const {jackpot} = this.props;
        if(!l1 || !l2 || !l3){
            return false; //All 3 levers are not yet played
        }
        console.log(this.props)
        this.props.decreaseBalance(2,()=>{
            if((l1===jackpot)&&(l2===jackpot)&&(l3===jackpot)){
                this.props.increaseBalance(5)
                console.log("jackpot")
                
            }else if((l1===l2)&&(l2===l3)){
                console.log("hell Fire");
                this.props.increaseBalance(2)
    
                // increaseBalance(2)
            }else if((l1 === l2) || (l1 === l3) || (l2 === l3)){
                console.log("Two Equal")
                this.props.increaseBalance(0.5)
    
                // increaseBalance(0.5)
            }
        })
        // Check For Each Win Cases 
       
    }


}
 
export default Game;