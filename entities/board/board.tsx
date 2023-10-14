import './board.css'
import {Fields} from "../fields/fields";
import React, {useState} from "react";

export const Board = () => {
  const initialPieces: IPiece[] = [
    {position: 'a1', color: 'w', rank: 'r'},
    {position: 'a2', color: 'w', rank: 'kn'},
    {position: 'a3', color: 'w', rank: 'b'},
    {position: 'a4', color: 'w', rank: 'q'},
    {position: 'a5', color: 'w', rank: 'k'},
    {position: 'a6', color: 'w', rank: 'b'},
    {position: 'a7', color: 'w', rank: 'kn'},
    {position: 'a8', color: 'w', rank: 'r'},
    {position: 'b1', color: 'w', rank: 'p'},
    {position: 'b2', color: 'w', rank: 'p'},
    {position: 'b3', color: 'w', rank: 'p'},
    {position: 'b4', color: 'w', rank: 'p'},
    {position: 'b5', color: 'w', rank: 'p'},
    {position: 'b6', color: 'w', rank: 'p'},
    {position: 'b7', color: 'w', rank: 'p'},
    {position: 'b8', color: 'w', rank: 'p'},

    {position: 'h1', color: 'b', rank: 'r'},
    {position: 'h2', color: 'b', rank: 'kn'},
    {position: 'h3', color: 'b', rank: 'b'},
    {position: 'h4', color: 'b', rank: 'q'},
    {position: 'h5', color: 'b', rank: 'k'},
    {position: 'h6', color: 'b', rank: 'b'},
    {position: 'h7', color: 'b', rank: 'kn'},
    {position: 'h8', color: 'b', rank: 'r'},
    {position: 'g1', color: 'b', rank: 'p'},
    {position: 'g2', color: 'b', rank: 'p'},
    {position: 'g3', color: 'b', rank: 'p'},
    {position: 'g4', color: 'b', rank: 'p'},
    {position: 'g5', color: 'b', rank: 'p'},
    {position: 'g6', color: 'b', rank: 'p'},
    {position: 'g7', color: 'b', rank: 'p'},
    {position: 'g8', color: 'b', rank: 'p'},
  ]

  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)

  const startPieceDrag = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement
    console.log(element)
    if (element.classList.contains('piece')) {
      element.style.position = 'absolute'
      element.style.left = `${e.clientX - 30}px`
      element.style.top = `${e.clientY - 30}px`

      setActivePiece(element)
    }
  }

  const dragPiece = (e: React.MouseEvent) => {
    if (activePiece) {
      activePiece.style.left = `${e.clientX - 30}px`
      activePiece.style.top = `${e.clientY - 30}px`
    }
  }

  const dropPiece = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activePiece) setActivePiece(null)
  }

  return (
    <div className='board'
         onMouseDown={startPieceDrag}
         onMouseMove={dragPiece}
         onMouseUp={dropPiece}
    >
      <Fields pieces = {initialPieces}/>
    </div>
  );
};