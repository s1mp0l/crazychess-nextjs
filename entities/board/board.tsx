"use client"

import './board.css'
import React, {useEffect, useState} from "react";
import {Board} from "@/features/chess-engine/board/Board";
import {FieldsComponent} from "@/entities/board/components/fields/fields";
import {Field} from "@/features/chess-engine/board/Field";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

export const BoardComponent = ({board, setBoard}: BoardProps) => {
  const [activeField, setActiveField] = useState<Field | null>(null)

  const click = (field: Field): void => {
    if (activeField && activeField !== field && activeField.piece?.canMove(field)) {
      activeField.moveFigure(field);
      setActiveField(null);
      updateBoard()
    } else {
      // if (field.piece?.color === currentPlayer?.color) {
        setActiveField(field);
      // }
    }
  }

  useEffect(() => {
    highlightCells()
  }, [activeField])

  const highlightCells = () => {
    board.highlightCells(activeField);
    updateBoard();
  }

  const updateBoard = () => {
    if (!board) return;
    console.log('updateBoard')

    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  // const startPieceDrag = (e: React.MouseEvent) => {
  //   const element = e.target as HTMLElement
  //   console.log(element)
  //   if (element.classList.contains('piece')) {
  //     element.style.position = 'absolute'
  //     element.style.left = `${e.clientX - 30}px`
  //     element.style.top = `${e.clientY - 30}px`
  //
  //     setActivePiece(element)
  //   }
  // }
  //
  // const dragPiece = (e: React.MouseEvent) => {
  //   if (activePiece) {
  //     activePiece.style.left = `${e.clientX - 30}px`
  //     activePiece.style.top = `${e.clientY - 30}px`
  //   }
  // }
  //
  // const dropPiece = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (activePiece) setActivePiece(null)
  // }

  return (
    <div className='board'
         // onMouseDown={startPieceDrag}
         // onMouseMove={dragPiece}
         // onMouseUp={dropPiece}
    >
      <FieldsComponent fields={board.getFields()} click={click} selectedField={activeField}/>
    </div>
  );
};