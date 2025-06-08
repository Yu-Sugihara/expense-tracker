import React from 'react';
import styled from 'styled-components';
import { Project } from '../types/Project';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Card = styled.div`
  width: 200px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  border: 1px solid #e0e0e0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 12px;
`;

const ProjectName = styled.h3`
  font-size: 20px;
  font-weight: bold;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: #212121;
`;

const AmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 12px;
  height: 48px;
  justify-content: space-between;
`;

const Label = styled.span<{ isVisible?: boolean}>`
  font-size: 12px;
  color: #888;
  visibility: ${({ isVisible }) => (isVisible ? "visible": "hidden")}
`;

const AmountText = styled.span<{ color: string; isVisible?: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ color }) => color};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const AvatarList = styled.div`
  display: flex;
  gap: -8px; /* オーバーラップ */
  margin: 8px 0;
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
  box-shadow: 0 0 2px rgba(0,0,0,0.15);
`;

type Props = {
  project?: Project;
  isNew?: boolean;
};

const ProjectCard: React.FC<Props> = ({ project, isNew }) => {
  const navigate = useNavigate();

  if (isNew) {
    return (
      <Card 
        onClick={() => navigate('/')}
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '264px', // 通常カードと同じ高さ
          cursor: 'pointer',
          textAlign: 'center'
      }}>
        <FaPlus size={32} style={{ marginBottom: '8px', color: '#4caf50' }} />
        <ProjectName style={{ fontSize: '16px', fontWeight: 'normal' }}>
          新しいプロジェクト
        </ProjectName>
      </Card>
    );
  }

  if (!project) return null;
  const { id, name, imageUrl, amountToPay, amountToReceive, participantAvatars } = project;

  return (
    <Card onClick={() => navigate(`/projects/${id}`)}>
      <Thumbnail src={imageUrl} alt={name} />
      <Content>
        <ProjectName>{name}</ProjectName>
        <AvatarList>
          {participantAvatars.slice(0, 4).map((url, index) => (
            <Avatar key={index} src={url} alt={`参加者${index + 1}`} />
          ))}
          {participantAvatars.length > 4 && (
            <span style={{ fontSize: '12px', marginLeft: '4px' }}>
              +{project.participantAvatars.length - 4}
            </span>
          )}
        </AvatarList>
        <AmountWrapper>
          {amountToPay === 0 && amountToReceive === 0 ? (
            <AmountText color="#888" isVisible={true} style={{ alignSelf: 'flex-start' }}>
              清算済み
            </AmountText>
          ) : (
            <>
              {/* 行1：貸し */}
              <div>
                <Label isVisible={amountToReceive > 0}>貸し：</Label>
                <AmountText color="#388e3c" isVisible={amountToReceive > 0}>
                  ¥{amountToReceive.toLocaleString()}
                </AmountText>
              </div>

              {/* 行2：借り */}
              <div>
                <Label isVisible={amountToPay > 0}>借り：</Label>
                <AmountText color="#d32f2f" isVisible={amountToPay > 0}>
                  ¥{amountToPay.toLocaleString()}
                </AmountText>
              </div>
            </>
          )}
        </AmountWrapper>
      </Content>
    </Card>
  );
};


export default ProjectCard;
