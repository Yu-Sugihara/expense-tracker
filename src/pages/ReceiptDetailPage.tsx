// src/pages/ReceiptDetailPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { mockReceipts } from '../mocks/receipts';
import Header from '../components/Header';
import ExpenseItemEditModal from '../components/ExpenseItemEditModal';

const Container = styled.div`
  max-width: 960px;
  margin: 40px auto;
  padding: 0 24px;
  font-family: 'Helvetica Neue', sans-serif;
`;

const BackButton = styled.button`
  margin-bottom: 16px;
  background: #f0f0f0;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MetaLabel = styled.div`
  color: #555;
  font-size: 14px;
`;

const MetaValue = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #222;
  margin-bottom: 12px;
`;

const ImageLink = styled.a`
  display: inline-block;
  font-size: 14px;
  margin-top: 12px;
  color: #0070f3;
  text-decoration: underline;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Th = styled.th`
  padding: 12px;
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
  text-align: left;
  color: #333;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background: #fff;
`;

const TrClickable = styled.tr`
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    background: #fafafa;
  }
`;

const MobileItemCard = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    padding: 16px;
    margin-bottom: 16px;
  }
`;

const ReceiptDetailPage: React.FC = () => {
  const { projectId, receiptId } = useParams();
  const receipt = mockReceipts.find(r => r.id === receiptId);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!receipt) return <p>レシートが見つかりません</p>;

  return (
    <>
      <Header />
      <Container>
        <BackButton onClick={() => navigate(`/projects/${projectId}/receipts`)}>
          ← レシート一覧に戻る
        </BackButton>
        <Card>
          <MetaGrid>
            <div>
              <MetaLabel>店舗</MetaLabel>
              <MetaValue>{receipt.store}</MetaValue>
            </div>
            <div>
              <MetaLabel>日付</MetaLabel>
              <MetaValue>{receipt.date}</MetaValue>
            </div>
            <div>
              <MetaLabel>時間</MetaLabel>
              <MetaValue>{receipt.time}</MetaValue>
            </div>
            <div>
              <MetaLabel>支払方法</MetaLabel>
              <MetaValue>{receipt.paymentMethod || '不明'}</MetaValue>
            </div>
            <div>
              <MetaLabel>税抜合計金額</MetaLabel>
              <MetaValue>{receipt.subtotal.toLocaleString()}円</MetaValue>
            </div>
            <div>
              <MetaLabel>税額</MetaLabel>
              <MetaValue>{receipt.tax.toLocaleString()}円</MetaValue>
            </div>
            <div>
              <MetaLabel>税込合計金額</MetaLabel>
              <MetaValue>{receipt.total.toLocaleString()}円</MetaValue>
            </div>
            <div>
              <MetaLabel>登録日時</MetaLabel>
              <MetaValue>{receipt.createdAt}</MetaValue>
            </div>
            <div>
              <MetaLabel>読取ステータス</MetaLabel>
              <MetaValue>{receipt.status}</MetaValue>
            </div>
          </MetaGrid>
          {receipt.imageUrl && (
            <ImageLink href={receipt.imageUrl} target="_blank" rel="noopener noreferrer">
              レシート画像を表示
            </ImageLink>
          )}
        </Card>

        <Card>
          <Table>
            <thead>
              <tr>
                <Th>商品名</Th><Th>支払額</Th><Th>カテゴリ</Th><Th>単価</Th><Th>数量</Th><Th>税込</Th><Th>割引</Th><Th>割引理由</Th><Th>割り勘</Th><Th>メモ</Th>
              </tr>
            </thead>
            <tbody>
              {receipt.items.map(item => (
                <TrClickable key={item.id} onClick={() => setEditingItemId(item.id)}>
                  <Td>{item.name}</Td>
                  <Td>{item.amount}</Td>
                  <Td>{item.category}</Td>
                  <Td>{item.unitPrice ?? ''}</Td>
                  <Td>{item.quantity ?? ''}</Td>
                  <Td>{item.taxIncluded ? '税込' : '税抜'}</Td>
                  <Td>{item.discount ?? ''}</Td>
                  <Td>{item.discountReason ?? ''}</Td>
                  <Td>{item.splitRatio ? '✔' : ''}</Td>
                  <Td>{item.memo ?? ''}</Td>
                </TrClickable>
              ))}
            </tbody>
          </Table>

          {/* モバイル表示 */}
          {receipt.items.map(item => (
            <MobileItemCard key={item.id} onClick={() => setEditingItemId(item.id)}>
              <div><strong>{item.name}</strong></div>
              <div>支払額: {item.amount}</div>
              <div>カテゴリ: {item.category}</div>
              <div>単価: {item.unitPrice ?? ''}</div>
              <div>数量: {item.quantity ?? ''}</div>
              <div>税込: {item.taxIncluded ? '税込' : '税抜'}</div>
              <div>割引: {item.discount ?? ''}</div>
              <div>割引理由: {item.discountReason ?? ''}</div>
              <div>割り勘: {item.splitRatio ? '✔' : ''}</div>
              <div>メモ: {item.memo ?? ''}</div>
            </MobileItemCard>
          ))}
        </Card>

        {editingItemId && (
          <ExpenseItemEditModal
            item={receipt.items.find(i => i.id === editingItemId)!}
            onClose={() => setEditingItemId(null)}
          />
        )}
      </Container>
    </>
  );
};

export default ReceiptDetailPage;