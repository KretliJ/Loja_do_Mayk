
import React from 'react';

// O componente recebe duas 'props':
// isOpen -> um booleano (true/false) que diz se o modal deve estar visível
// onClose -> uma função para ser chamada quando o usuário quiser fechar o modal
interface ZeldaModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ZeldaCouponModal: React.FC<ZeldaModalProps> = ({ isOpen, onClose }) => {
  // Se 'isOpen' for falso, o componente não renderiza nada.
  if (!isOpen) {
    return null;
  }

  // Estilos (CSS dentro do JavaScript)
  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo preto semi-transparente
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000, // Garante que o modal fique na frente de tudo
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: '#222', // Cor de fundo escura, temática de caverna
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    border: '2px solid #555',
    textAlign: 'center',
    maxWidth: '500px', // Largura máxima em telas grandes
    width: '90%',      // Ocupa 90% em telas pequenas (responsividade)
    position: 'relative',
    fontFamily: 'monospace', // Uma fonte que combina com o tema retrô
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
  };

  return (
    // O overlay (fundo) também fecha o modal ao ser clicado
    <div style={modalOverlayStyle} onClick={() => onClose(false)}>
      {/* Usamos e.stopPropagation() para evitar que o clique no conteúdo feche o modal */}
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={() => onClose(false)}>&times;</button>
        <img 
          src="/cupom_Zelda10.png" 
          alt="It's dangerous to go alone" 
          style={{ maxWidth: '150px', marginBottom: '20px' }} 
          className='object-fill mx-auto w-full'
        />
        <p style={{ fontSize: '1.2rem', margin: '0' }}>
          Não fique sozinho, leve este cupom
        </p>
        <p style={{ 
          fontSize: '1.8rem', 
          fontWeight: 'bold', 
          color: '#FCEE09', // Cor amarela para destaque
          margin: '10px 0',
          border: '2px dashed #FCEE09',
          padding: '10px'
        }}>
          ZELDA10
        </p>
        <p style={{ fontSize: '1.2rem', margin: '0' }}>
          para receber 10% de desconto.
        </p>
      </div>
    </div>
  );
};