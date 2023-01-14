import {
  Piece,
  PieceType,
  TeamType,
} from "../Components/ChessBoard/ChessBoard";

export default class Refree {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isMoveValid(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    console.log("refree is checking the move");
    console.log("previous location: (", px, ",", py, ")");
    console.log("Current location: (", x, ",", y, ")");
    console.log("Piecetype", type);
    console.log("Teamtype", team);

    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      //  more refactored pawn logic
      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true;
        }
      }

      // refactor-1 pawn logic

      //   if (py === specialRow) {
      //     if (px === x && y - py ===  pawnDirection) {
      //       if (!this.tileIsOccupied(x, y, boardState)) {
      //         return true;
      //       }
      //     } else if (px === x && y - py === 2 * pawnDirection) {
      //       if (
      //         !this.tileIsOccupied(x, y, boardState) &&
      //         !this.tileIsOccupied(x, y - pawnDirection, boardState)
      //       ) {
      //         return true;
      //       }
      //     }
      //   } else {
      //     if (px === x && y - py === pawnDirection) {
      //       if (!this.tileIsOccupied(x, y, boardState)) {
      //         return true;
      //       }
      //     }
      //   }
    }
    // Manual logic
    // if (type === PieceType.PAWN) {
    //     if (team === TeamType.OUR) {
    //     //   white pawn movement
    //     if (py === 1) {
    //       if (px === x && y - py === 1) {
    //         if (!this.tileIsOccupied(x, y, boardState)) {
    //           return true;
    //         }
    //       } else if (px === x && y - py === 2) {
    //         if (!this.tileIsOccupied(x, y-1, boardState)) {
    //           return true;
    //         }
    //       }
    //     } else {
    //       if (px === x && y - py === 1) {
    //         if (!this.tileIsOccupied(x, y, boardState)) {
    //           return true;
    //         }
    //       }
    //     }
    //   } else {
    //     //   Black pawns movement
    //     if (py === 6) {
    //         if (px === x && (y - py === -1)) {
    //             if (!this.tileIsOccupied(x, y, boardState)) {
    //                 return true;
    //             }
    //         } else if (px===x && (y-py===-2)) {
    //             if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y+1, boardState)) {
    //                 return true;
    //             }

    //         }
    //     } else {
    //       if (px === x && y - py === -1) {
    //         if (!this.tileIsOccupied(x, y, boardState)) {
    //           return true;
    //         }
    //       }
    //     }
    //   }
    // }
    return false;
  }
}
