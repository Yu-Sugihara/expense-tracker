// src/pages/ProjectDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { mockProjects } from '../mocks/projects';
import Header from '../components/Header';
import ReceiptUploadModal from '../components/ReceiptUploadModal';
import { useState } from 'react';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 24px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const SubText = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const BalanceCard = styled.div`
  background: #f5f5f5;
  border-radius: 12px;
  padding: 24px;
  font-size: 28px;
  margin-bottom: 24px;
`;

const AvatarGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
`;

const ActionButton = styled.button<{ green?: boolean }>`
  background-color: ${({ green }) => (green ? '#4caf50' : '#f0f0f0')};
  color: ${({ green }) => (green ? '#fff' : '#333')};
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ green }) => (green ? '#43a047' : '#e0e0e0')};
  }
`;

const Breakdown = styled.div`
  margin-top: 24px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
`;

const BreakdownItem = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Activity = styled.div`
  margin-top: 40px;
`;

const ActivityItem = styled.li`
  list-style: none;
  padding-left: 24px;
  margin-bottom: 12px;
  position: relative;

  &::before {
    content: '🧾';
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams();
  const project = mockProjects.find(p => p.id === projectId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState<'camera' | 'file' | null>(null);

  if (!project) return <div>プロジェクトが見つかりません</div>;

  const netBalance = project.amountToReceive - project.amountToPay;
  const debtBreakdown = project.debtBreakdown || [];


  return (
    <>
      <ReceiptUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onModeSelect={(mode) => {
          setUploadMode(mode);
          // TODO: ステップ2に進むロジック
        }}
      />
      <Header />
      <Container>
        <Title>{project.name}</Title>
        <SubText>Total balance</SubText>
        <BalanceCard>
          {netBalance.toLocaleString()} 円
        </BalanceCard>
        <AvatarGroup>
          {project.participantAvatars.map((src, i) => (
            <Avatar key={i} src={src} />
          ))}
        </AvatarGroup>
        <ButtonGroup>
          <ActionButton onClick={() => setIsModalOpen(true)}>＋レシート登録</ActionButton>
          <ActionButton green>＋支出登録</ActionButton>
        </ButtonGroup>

        {debtBreakdown.length > 0 && (
          <Breakdown>
            <h3>貸し借り明細</h3>
            {debtBreakdown.map((item, index) => (
              <BreakdownItem key={index}>
                {item.from} → {item.to}：{item.amount.toLocaleString()} 円
              </BreakdownItem>
            ))}
          </Breakdown>
        )}

        <Activity>
          <h3>Recent Activity</h3>
          <ul>
            <ActivityItem>Liam added 'Dinner at The Bistro' - 2 hours ago</ActivityItem>
            <ActivityItem>You added 'Gas for the trip' - 4 hours ago</ActivityItem>
          </ul>
        </Activity>
      </Container>
    </>
  );
};

export default ProjectDetailPage;
