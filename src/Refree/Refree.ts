import { PieceType,TeamType } from "../Components/ChessBoard/ChessBoard";

export default class Refree { 
    isMoveValid(px:number,py:number,x:number,y:number,type:PieceType,team:TeamType) { 
        console.log("refree is checking the move");
        console.log("previous location: (",px,",",py,")");
        console.log("Current location: (",x,",",y,")");
        console.log("Piecetype", type);
        console.log("Teamtype", team);
        
        if (type === PieceType.PAWN) { 
            if (team === TeamType.OUR) { 
                if (py === 1) {
                    if (px === x && (y - py === 1 || y - py === 2)) {
                        return true;
                    }
                } else { 
                    if (px === x && y - py === 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}