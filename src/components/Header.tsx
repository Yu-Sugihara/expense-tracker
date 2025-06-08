import React from 'react';
import styled from 'styled-components';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router';


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AppName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const RightIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #444;

  &:hover {
    color: #000;
  }
`;

const Nav = styled.nav<{ open: boolean }>`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 12px;
    background-color: #fff;
    padding: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    border-radius: 8px;
    z-index: 1000;
  }
`;

const NavButton = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
`;

const MenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin-right: 8px;
  }
`;


const Header: React.FC = () => {
  const { pathname } = useLocation();
  const isDetailPage = pathname.startsWith("/projects/");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const projectId = useParams().projectId

  return (
    <HeaderContainer>
      <AppName>割り勘アプリ（仮）</AppName>
      <RightIcons>
        {isDetailPage && (
          <>
            <MenuButton onClick={() => setMenuOpen(prev => !prev)}>
              ☰
            </MenuButton>
            <Nav open={menuOpen}>
              <NavButton to="/">プロジェクト</NavButton>
              <NavButton to="#">清算</NavButton>
              <NavButton to={`/projects/${projectId}/receipts`}>レシート</NavButton>
              <NavButton to="#">支出</NavButton>
            </Nav>
          </>
        )}
        <IconButton aria-label="通知">
          <FaBell />
        </IconButton>
        <IconButton aria-label="ユーザー">
          <FaUserCircle />
        </IconButton>
      </RightIcons>
    </HeaderContainer>
  );
};

export default Header;
