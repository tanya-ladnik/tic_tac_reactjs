class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this.tileClick = this.tileClick.bind(this);
    this.reset = this.reset.bind(this);
  }
  getState() {
    return {
      blocks:  new Array(9).join(".").split('.'),
      currentPlayer: 'x',
      winner: '',
    }
  }
  reset() {
    this.setState(this.getState());
  }
  check(pair){
    var item1 = this.state.blocks[pair[0]];
    var item2 = this.state.blocks[pair[1]];
    var item3 = this.state.blocks[pair[2]];
    if(item1 == 'x' && item2 == 'x' && item3 == 'x'){
      this.state.winner = 'X Won!';
    }
    if(item1 == 'o' && item2 == 'o' && item3 == 'o'){
      this.state.winner = 'O Won!';
    }
    return this.state.winner ? true : false;
  }
  gameOver() {
    var winPairs = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                     [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ]
    var res;                        
    for(var i=0; i<winPairs.length; i++) {
      if(this.check(winPairs[i])){ 
        return true;
      }
    }                       
    return false;
  }
  
  tileClick(position, player) {
    if(this.state.winner){return}
    var blocks = this.state.blocks;
    if(blocks[position] == ''){
      blocks[position] = player;
      this.setState({blocks: blocks, currentPlayer: player === 'x' ? 'o' : 'x'});
      this.gameOver();
    }  
  }

  render() {
    return( <div>
      <div id='game'>
        <h2>Tic Tac Toe</h2>
        <h2>{this.state.winner}</h2>
        <h3>
          {!this.state.winner ?  `${this.state.currentPlayer}'s turn` : null }
        </h3>    
        <div className="reset"><button onClick={this.reset}>Reset</button></div>
        { this.state.blocks.map(function(block,position){
          return (
            <Tile status={block} pos={position} currentPlayer={this.state.currentPlayer} tileClick={this.tileClick} />
          );
        }, this) }
      </div>
    </div>
   )        
  }
};
class Tile extends React.Component {
 clickHandler() {
   this.props.tileClick(this.props.pos, this.props.currentPlayer)
 }
 render() {
    return <div className="block" onClick={this.clickHandler.bind(this)}>{this.props.status}</div>
 }
};

ReactDOM.render(<Game/>, document.getElementById('container'))
