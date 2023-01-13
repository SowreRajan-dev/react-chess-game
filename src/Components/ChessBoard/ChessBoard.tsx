import React from 'react'
import Tile from '../Tile/Tile';
import "./ChessBoard.css"

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1","2","3","4","5","6","7","8"]

interface Piece { 
    image: string;
    x: number;
    y: number;
}

const pieces: Piece[] = [];

// black and white pawns
for (let i = 0; i < 8; i++) { 
    pieces.push({image:"/assests/images/pawn_b.png",x:i ,y:6})
}
for (let i = 0; i < 8; i++) { 
    pieces.push({image:"/assests/images/pawn_w.png",x:i ,y:1})
}

for (let p = 0; p < 2; p++){
    const type = (p === 0) ? "b" : "w";
    const y = (p === 0) ? 7 : 0; 
    pieces.push({image:`/assests/images/rook_${type}.png`,x:0,y:y})
    pieces.push({image:`/assests/images/rook_${type}.png`,x:7,y:y})
    pieces.push({image:`/assests/images/knight_${type}.png`,x:1,y:y})
    pieces.push({image:`/assests/images/knight_${type}.png`,x:6,y:y})
    pieces.push({image:`/assests/images/bishop_${type}.png`,x:2,y:y})
    pieces.push({image:`/assests/images/bishop_${type}.png`,x:5,y:y})
    pieces.push({image:`/assests/images/queen_${type}.png`,x:3,y:y})
    pieces.push({image:`/assests/images/king_${type}.png`,x:4,y:y})
    
}



function ChessBoard() {
    let board = [];
    for (let j = verticalAxis.length-1; j>=0; j--) { 
        for (let i= 0; i<horizontalAxis.length; i++)  { 
            const number = j + i + 2;
            let image = undefined;
            pieces.forEach(p => { 
                if (p.x === i && p.y === j) { 
                    image = p.image;
                }
            })
            board.push(<Tile number={number} image={image} />);
        }
    }
  return (
      <div id="chessBoard">
          {board}
    </div>
  )
}

export default ChessBoard