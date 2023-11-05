"use client"

import {Chess} from "@/features/chess-engine/chess";
import {BoardComponent} from "@/entities/board/board";
import {useState} from "react";
import {Board} from "@/features/chess-engine/board/Board";

export const Game = () => {
  const [board, setBoard] = useState(new Board());
  // const chess = new Chess(null, 8);
  //
  // const board = chess.getBoard();
  // chess.setBoard.bind(chess)

  return <BoardComponent board={board} setBoard={setBoard}/>
}