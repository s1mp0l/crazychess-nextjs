import './board.css'
import React, {useCallback, useEffect, useState} from "react";
import {Board} from "@/src/features/chess-engine/board/Board";
import {FieldsComponent} from "@/src/entities/board/components/fields/fields";
import {Field} from "@/src/features/chess-engine/board/Field";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

interface BoardProps {
  board: Board;
  updateBoard: () => void;
}

export const BoardComponent = ({board, updateBoard}: BoardProps) => {
  const [activeField, setActiveField] = useState<Field | null>(null)

  const click = (field: Field): void => {
    if (activeField && activeField !== field && activeField.piece?.canMove(field)) {
      activeField.moveFigure(field);
      setActiveField(null);
      updateBoard()
    } else {
      if (field.piece?.color === board.getTurn()) {
        setActiveField(field);
      }
    }
  }

  const highlightCells = useCallback(() => {
    board.highlightCells(activeField);
    updateBoard();
  }, [activeField, board, updateBoard])

  useEffect(() => {
    highlightCells()
  }, [activeField])

  const dragPiece = (field: Field) => {
    if (field.piece?.color === board.getTurn()) {
      setActiveField(field);
    }
  }

  const dropPiece = (field: Field) => {
    if (activeField && !(activeField.x === field.x && activeField.y === field.y) && activeField.piece?.canMove(field)) {
      activeField.moveFigure(field);
      setActiveField(null);
      updateBoard();
    }
  }

  return (
    <div className='board'>
      <DndProvider backend={HTML5Backend}>
        <FieldsComponent fields={board.getFields()}
                         click={click}
                         selectedField={activeField}
                         dragPiece={dragPiece}
                         dropPiece={dropPiece}
        />
      </DndProvider>
    </div>
  );
};