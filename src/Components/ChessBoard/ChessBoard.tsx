import React, { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./ChessBoard.css";
import Refree from "../../Refree/Refree";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

export enum TeamType {
  OPPONENT,
  OUR,
}

const initialBoardState: Piece[] = [];

// black and white pawns
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "/assests/images/pawn_b.png",
    x: i,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  });
}
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "/assests/images/pawn_w.png",
    x: i,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  });
}

//other pieces
for (let p = 0; p < 2; p++) {
  const teamType = p === 0 ? TeamType.OPPONENT : TeamType.OUR;
  const type = teamType === TeamType.OPPONENT ? "b" : "w";
  const y = teamType === TeamType.OPPONENT ? 7 : 0;
  initialBoardState.push({
    image: `/assests/images/rook_${type}.png`,
    x: 0,
    y: y,
    type: PieceType.ROOK,
    team: teamType,
  });
  initialBoardState.push({
    image: `/assests/images/rook_${type}.png`,
    x: 7,
    y: y,
    type: PieceType.ROOK,
    team: teamType,
  });
  initialBoardState.push({
    image: `/assests/images/knight_${type}.png`,
    x: 1,
    y: y,
    type: PieceType.KNIGHT,
    team: teamType,
  });
  initialBoardState.push({
    image: `/assests/images/knight_${type}.png`,
    x: 6,
    y: y,
    type: PieceType.KNIGHT,
    team: teamType,
  });
  initialBoardState.push({
    image: `/assests/images/bishop_${type}.png`,
    x: 2,
    y: y,
    type: PieceType.BISHOP,
    team: teamType,
  });
  initialBoardState.push({
    image: `/assests/images/bishop_${type}.png`,
    x: 5,
    y: y,
    type: PieceType.BISHOP,
    team: teamType,
  });
  initialBoardState.push({
    image: `/assests/images/queen_${type}.png`,
    x: 3,
    y: y,
    type: PieceType.QUEEN,
    team: teamType,
  });
  initialBoardState.push({
    image: `/assests/images/king_${type}.png`,
    x: 4,
    y: y,
    type: PieceType.KING,
    team: teamType,
  });
}
function ChessBoard() {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [activePiece, setActivePiece] = useState<HTMLElement | null>();

  const chessBoardRef = useRef<HTMLDivElement>(null);
  const refree = new Refree();

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessBoardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
      );

      element.style.position = "absolute";
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.left = x + "px";
      element.style.top = y + "px";
      setActivePiece(element);
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
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      // grid grabbs the piece position
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            const validMove = refree.isMoveValid(
              gridX,
              gridY,
              x,
              y,
              p.type,
              p.team
            );
            if (validMove) {
              p.x = x;
              p.y = y;
            } else {
              activePiece.style.position = "relative";
              activePiece.style.removeProperty("top");
              activePiece.style.removeProperty("left");
            }
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
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
