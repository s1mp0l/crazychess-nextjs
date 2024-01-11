import './game-over-modal.css'

interface GameOverModalProps {
  loser: PieceColor;
}

export const GameOverModal = ({loser}: GameOverModalProps) => {

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <span>GAME OVER</span>
          </div>

          <div className="modal-body">
            <span>{loser === 'w' ? 'Белые' : 'Чёрные'} проиграли!</span>
          </div>
        </div>
      </div>
    </div>
  )
};