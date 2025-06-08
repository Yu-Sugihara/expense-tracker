import React from 'react';
import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import { Project } from '../types/Project';
import { mockProjects } from '../mocks/projects';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 16px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  box-sizing: border-box;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const ProjectGrid = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 80px 16px;
`;

const EmptyImage = styled.img`
  width: 160px;
  height: auto;
  margin-bottom: 24px;
`;

const EmptyText = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const EmptySubText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

const NewProjectButton = styled.button`
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ProjectListPage: React.FC = () => {
  const [projects, setProjects] = React.useState<Project[]>(mockProjects);

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <HeaderTitle>あなたのプロジェクト</HeaderTitle>
          {projects.length === 0 ? (
            <EmptyStateContainer>
              <EmptyImage src="/images/bucket_iron_empty_down.png" alt="No projects" />
              <EmptyText>まだプロジェクトがありません</EmptyText>
              <EmptySubText>プロジェクトを作成して支出を管理しましょう。</EmptySubText>
              <NewProjectButton>新しいプロジェクトを作成</NewProjectButton>
            </EmptyStateContainer>
          ) : (
            <ProjectGrid>
              <ProjectCard isNew />
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </ProjectGrid>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default ProjectListPage;