// src/pages/ReceiptListPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Receipt } from '../types/Receipt';
import { mockReceipts } from '../mocks/receipts';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router';

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
  background: #f5f5f5;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
`;

const Checkbox = styled.input`
  transform: scale(1.2);
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background: #4caf50;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: #f44336;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;

const CardList = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const CardRow = styled.div`
  margin-bottom: 6px;
  font-size: 14px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 4px;
`;

const PageButton = styled.button`
  padding: 6px 10px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  &.active {
    background: #4caf50;
    color: white;
    font-weight: bold;
  }
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

const sortOrders = ['none', 'asc', 'desc'] as const;
type SortOrder = typeof sortOrders[number];

const ReceiptListPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<keyof Receipt | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleSort = (key: keyof Receipt) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder('asc');
    } else {
      const currentIndex = sortOrders.indexOf(sortOrder);
      const nextOrder = sortOrders[(currentIndex + 1) % sortOrders.length];
      setSortOrder(nextOrder);
    }
    setCurrentPage(1);
  };

  const getSortSymbol = (key: keyof Receipt): string => {
    if (sortKey !== key) return '';
    if (sortOrder === 'asc') return ' ▲';
    if (sortOrder === 'desc') return ' ▼';
    return '';
  };

const sortedReceipts = [...mockReceipts].sort((a, b) => {
  if (!sortKey || sortOrder === 'none') return 0;

  const aValue = a[sortKey] ?? '';
  const bValue = b[sortKey] ?? '';

  if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
  if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
  return 0;
});


  const totalPages = Math.ceil(sortedReceipts.length / pageSize);
  const paginatedReceipts = sortedReceipts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getPageNumbers = () => {
    const range: (number | string)[] = [];
    const maxButtons = 7;
    const side = 2;
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (currentPage <= side + 2) {
        for (let i = 1; i <= side + 3; i++) range.push(i);
        range.push('...');
        range.push(totalPages);
      } else if (currentPage >= totalPages - side - 1) {
        range.push(1);
        range.push('...');
        for (let i = totalPages - (side + 2); i <= totalPages; i++) range.push(i);
      } else {
        range.push(1);
        range.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) range.push(i);
        range.push('...');
        range.push(totalPages);
      }
    }
    return range;
  };

  const allVisibleIds = paginatedReceipts.map((r) => r.id);
  const isAllSelected = allVisibleIds.every((id) => selectedIds.includes(id));
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) => prev.filter((id) => !allVisibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...allVisibleIds])));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState<'camera' | 'file' | null>(null);
  
  return (
    <>
      <Header/>
      <Container>
        <Title>レシート一覧</Title>
        <ActionRow>
          <AddButton onClick={() => setIsModalOpen(true)}>＋レシート登録</AddButton>
          <DeleteButton onClick={() => alert('一括削除（ダミー）')}>
            選択したレシートを削除
          </DeleteButton>
        </ActionRow>

        <Table>
          <thead>
            <tr>
              <Th>
                <Checkbox
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </Th>
              <Th onClick={() => handleSort('store')}>店舗{getSortSymbol('store')}</Th>
              <Th onClick={() => handleSort('date')}>日時{getSortSymbol('date')}</Th>
              <Th onClick={() => handleSort('total')}>税込合計{getSortSymbol('total')}</Th>
              <Th onClick={() => handleSort('status')}>割り勘ステータス{getSortSymbol('status')}</Th>
            </tr>
          </thead>
          <tbody>
            {paginatedReceipts.map((receipt) => (
                <TrClickable
                key={receipt.id}
                onClick={() => navigate(`/projects/${projectId}/receipts/${receipt.id}`)}
                >
                <Td onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                    type="checkbox"
                    checked={selectedIds.includes(receipt.id)}
                    onChange={() => toggleSelect(receipt.id)}
                    />
                </Td>
                <Td>{receipt.store}</Td>
                <Td>{receipt.date}</Td>
                <Td>{receipt.total.toLocaleString()}円</Td>
                <Td>{receipt.status}</Td>
                </TrClickable>
            ))}
            </tbody>

        </Table>

        <CardList>
          {paginatedReceipts.map((receipt) => (
            <Card key={receipt.id}>
              <CardRow><Checkbox
                type="checkbox"
                checked={selectedIds.includes(receipt.id)}
                onChange={() => toggleSelect(receipt.id)}
              /> {receipt.store}</CardRow>
              <CardRow>📅 {receipt.date}</CardRow>
              <CardRow>💰 {receipt.total.toLocaleString()}円</CardRow>
              <CardRow>🔄 {receipt.status}</CardRow>
              <CardRow>
                <a
                    href="#"
                    onClick={(e) => {
                    e.preventDefault();
                    navigate(`/projects/${projectId}/receipts/${receipt.id}`);
                    }}
                >
                    詳細
                </a>
                </CardRow>
            </Card>
          ))}
        </CardList>

        <Pagination>
          <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>{'<<'}</PageButton>
          <PageButton onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>{'<'}</PageButton>
          {getPageNumbers().map((page, idx) => (
            typeof page === 'number' ? (
              <PageButton
                key={idx}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </PageButton>
            ) : (
              <span key={idx} style={{ padding: '6px 10px' }}>...</span>
            )
          ))}
          <PageButton onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>{'>'}</PageButton>
          <PageButton onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>{'>>'}</PageButton>
        </Pagination>
      </Container>
    </>
  );
};

export default ReceiptListPage;