// src/components/ExpenseItemEditModal.tsx
import React from 'react';
import styled from 'styled-components';
import { ExpenseItem } from '../types/ExpenseItem';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const CloseButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  float: right;
`;

interface Props {
  item: ExpenseItem;
  onClose: () => void;
}

const ExpenseItemEditModal: React.FC<Props> = ({ item, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Row>
          <Label>商品名</Label>
          <Input defaultValue={item.name} />
        </Row>
        <Row>
          <Label>カテゴリ</Label>
          <Input defaultValue={item.category} />
        </Row>
        <Row>
          <Label>支払額</Label>
          <Input type="number" defaultValue={item.amount} />
        </Row>
        <Row>
          <Label>単価</Label>
          <Input type="number" defaultValue={item.unitPrice ?? ''} />
        </Row>
        <Row>
          <Label>数量</Label>
          <Input type="number" defaultValue={item.quantity ?? ''} />
        </Row>
        <Row>
          <Label>税込</Label>
          <Input type="checkbox" defaultChecked={item.taxIncluded ?? false} />
        </Row>
        <Row>
          <Label>割引</Label>
          <Input type="number" defaultValue={item.discount ?? ''} />
        </Row>
        <Row>
          <Label>割引理由</Label>
          <Input defaultValue={item.discountReason ?? ''} />
        </Row>
        <Row>
          <Label>割り勘分担</Label>
          <Textarea defaultValue={JSON.stringify(item.splitRatio ?? {}, null, 2)} rows={3} />
        </Row>
        <Row>
          <Label>メモ</Label>
          <Textarea defaultValue={item.memo ?? ''} rows={3} />
        </Row>
        <CloseButton onClick={onClose}>閉じる</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ExpenseItemEditModal;