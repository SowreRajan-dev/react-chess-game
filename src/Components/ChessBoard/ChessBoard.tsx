import React, { useRef } from "react";
import Tile from "../Tile/Tile";
import "./ChessBoard.css";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

// black and white pawns
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "/assests/images/pawn_b.png", x: i, y: 6 });
}
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "/assests/images/pawn_w.png", x: i, y: 1 });
}

//other pieces
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;
  pieces.push({ image: `/assests/images/rook_${type}.png`, x: 0, y: y });
  pieces.push({ image: `/assests/images/rook_${type}.png`, x: 7, y: y });
  pieces.push({ image: `/assests/images/knight_${type}.png`, x: 1, y: y });
  pieces.push({ image: `/assests/images/knight_${type}.png`, x: 6, y: y });
  pieces.push({ image: `/assests/images/bishop_${type}.png`, x: 2, y: y });
  pieces.push({ image: `/assests/images/bishop_${type}.png`, x: 5, y: y });
  pieces.push({ image: `/assests/images/queen_${type}.png`, x: 3, y: y });
  pieces.push({ image: `/assests/images/king_${type}.png`, x: 4, y: y });
}
function ChessBoard() {
  let activePiece: HTMLElement | null = null;
  const chessBoardRef = useRef<HTMLDivElement>(null);
  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
      element.style.position = "absolute";
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.left = x + "px";
      element.style.top = y + "px";
      activePiece = element;
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute ";
      if (x < minX) {
        activePiece.style.left = minX + "px";
      } else if (x > maxX) {
        activePiece.style.left = maxX + "px";
      } else {
        activePiece.style.left = x + "px";
      }
      if (y < minY) {
        activePiece.style.top = minY + "px";
      } else if (y > maxY) {
        activePiece.style.top = maxY + "px";
      } else {
        activePiece.style.top = y + "px";
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    if (activePiece) {
      activePiece = null;
    }
  }
  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image = undefined;
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(
        <Tile
          number={number}
          key={`
            (${i},${j})
            `}
          image={image}
        />
      );
    }
  }
  return (
    <div
      id="chessBoard"
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessBoardRef}
    >
      {board}
    </div>
  );
}

export default ChessBoard;
