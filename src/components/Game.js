import { Button, Modal } from "@material-ui/core";
import React from 'react';
// import SlotMachine from 'jquery-slotmachine';
import SlotMachine from 'jquery-slotmachine/lib/slot-machine.js';



class Game extends React.Component {
    state={
        lever_one:null,
        lever_two:null,
        lever_three:null,
        symbols:[ "♠", '♥', '♦', '♣'],
        m1:null,        
        m2:null,        
        m3:null,     
        reward:''   
    }
    l1= '?'//this.getRandomSymbol();
    l2 = '?'//this.getRandomSymbol();
    l3 = '?'//this.getRandomSymbol();
    componentDidMount(){
        this.setState({
            symbols:this.props.symbols
        })
        
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
    componentWillUnmount(){
        this.reset();
    }
    render() { 
        const {gameOpen,handleGameClose} = this.props;
        const {lever_one,lever_two,lever_three,symbols,reward} = this.state;
        const {setLeverOne,setLeverTwo, setLeverThree,reset ,debug} = this;
        return <div>
            <Modal
                open={gameOpen}
                onClose={handleGameClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            <div className="paper">
            <h2>Game  </h2>
            <h2 className="reward">{reward} </h2>
            <div className='card_body'>
                <div id="lever_1" className="levers">
                    {symbols.map((s,i)=>
                        <div key={i}>
                            {s}
                        </div>
                        )}
                </div>
                <div id="lever_2" className="levers">
                    {symbols.map((s,i)=>
                        <div key={i*i}>
                            {s}
                        </div>
                        )}
                </div>
                <div id="lever_3" className="levers">
                    {symbols.map((s,i)=>
                        <div key={i*i*i}>
                            {s}
                        </div>
                        )}
                </div>
            </div>
            <div className="card_body">
                <div><Button color="primary" disabled={lever_one !== null} variant="contained" onClick={setLeverOne} >L1</Button></div>
                <div><Button color="primary"  disabled={lever_two !== null}  variant="contained" onClick={setLeverTwo} >L2</Button></div>
                <div><Button color="primary" disabled={lever_three !== null} variant="contained" onClick={setLeverThree} >L3</Button></div>
            </div>
            <div>
                <Button variant="outlined" className="m-3" color="primary" onClick={debug}>Debug</Button>
                <Button variant="outlined" className="m-3" color="primary" onClick={reset}>Play Again : $2</Button>
                <Button variant="outlined" className="m-3" color="primary" onClick={handleGameClose}>QUIT</Button>
            </div>
            </div>
      </Modal>
        </div>;
    }

    reset=()=>{
        if(this.props.balance>=2){
            const {m1,m2,m3} = this.state;
            if(m1&&m2&&m3){
                m1.nextActive = 0;
                m2.nextActive = 0;
                m3.nextActive = 0;
                m1.shuffle(1)
                m2.shuffle(1)
                m3.shuffle(1)
                m1.destroy()
                m2.destroy()
                m3.destroy()
            }
            this.setState({
                lever_one:null,
                lever_two:null,
                lever_three:null   
            });
        }
    }
    debug=()=>{
        const {m1,m2,m3} = this.state;
        if(m1&&m2&&m3){
            m1.nextActive = 0;
            m2.nextActive = 0;
            m3.nextActive = 0;
            m1.shuffle(1)
            m2.shuffle(1)
            m3.shuffle(1)
        }
        setTimeout(()=>{
            this.setState({
                lever_one:this.props.symbols[0],
                lever_two:this.props.symbols[0],
                lever_three:this.props.symbols[0]   
            },this.checkResult);
        },1000)
        // this.checkResult();
    }
    
    getRandomSymbol(){
        let {symbols} = this.props;
        let randIndex = Math.round((Math.random()*(symbols.length-1)));
        return symbols[randIndex];
    }
    getRandIndex(){
        let {symbols} = this.props;
        let randIndex = Math.round((Math.random()*(symbols.length-1)));
        return randIndex;      
    }
    setLeverOne = ( active='' ) =>{
        if(this.state.lever_one){
            return
        }
        const el = document.querySelector("#lever_1");
        let i = this.getRandIndex();

        const machine = new SlotMachine(el, {
            active: i,
            nextActive:i,
            delay: 550,
          });
        //  machine.destroy();
        //   machine.run();
        machine.stop();
        this.setState({
            m1:machine,
            lever_one:this.props.symbols[machine.active]
        }, this.checkResult);
    } 
    setLeverTwo = ( ) =>{
        if(this.state.lever_two){
            return
        }
        const el = document.querySelector("#lever_2");
        let i = this.getRandIndex();

        const machine = new SlotMachine(el, {
            active: i,
            nextActive:i,
            delay: 550,
            auto: false,
          });
        machine.stop();
        this.setState({
            m2:machine,
            lever_two:this.props.symbols[machine.active]
        }, this.checkResult);
     
    } 
    setLeverThree = ( ) =>{
        if(this.state.lever_three){
            return
        }
        const el = document.querySelector("#lever_3");
        let i = this.getRandIndex();
        const machine = new SlotMachine(el, {
            active: i,
            delay: 550,
            nextActive:i,
            auto: false,
          });
        machine.stop();
        this.setState({
            m3:machine,
            lever_three:this.props.symbols[machine.active]
        }, this.checkResult);

    } 
    checkResult = () =>{
        const l1 = this.state.lever_one;
        const l2 = this.state.lever_two;
        const l3 = this.state.lever_three;
        const {jackpot} = this.props;
        if(!l1 || !l2 || !l3){
            return false; //All 3 levers are not yet played
        }
        this.props.decreaseBalance(2,()=>{
            if((l1===jackpot)&&(l2===jackpot)&&(l3===jackpot)){
                this.setState({
                    reward:'!!!! JACKPOT $5 !!!!!'
                })
                this.props.increaseBalance(5)
                setTimeout(()=>{
                    this.setState({
                        reward:''
                    })
                },2000);
            }else if((l1===l2)&&(l2===l3)){
                this.props.increaseBalance(2)
                this.setState({
                    reward:'!!!! $2 !!!!!'
                })
                setTimeout(()=>{
                    this.setState({
                        reward:''
                    })
                },2000);
            }else if((l1 === l2) || (l1 === l3) || (l2 === l3)){
                console.log("Two Equal")
                this.setState({
                    reward:'!!!! $0.5 !!!!!'
                })
                setTimeout(()=>{
                    this.setState({
                        reward:''
                    })
                },2000);
                // increaseBalance(0.5)
            }
        },{l1,l2,l3})
        // Check For Each Win Cases 
       
    }


}
 
export default Game;