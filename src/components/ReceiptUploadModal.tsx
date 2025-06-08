import React from 'react';
import styled from 'styled-components';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onModeSelect: (mode: 'camera' | 'file') => void;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  position: relative;
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 20px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #f0f0f0;
  transition: background 0.2s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const ReceiptUploadModal: React.FC<Props> = ({ isOpen, onClose, onModeSelect }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>レシート登録方法を選択</Title>
        <Button onClick={() => onModeSelect('camera')}>📷 カメラで撮影</Button>
        <Button onClick={() => onModeSelect('file')}>🖼 ストレージから選択</Button>
      </Modal>
    </Overlay>
  );
};

export default ReceiptUploadModal;
