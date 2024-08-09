// src/components/Header.js
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  background: #212121;
  box-shadow: 15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60);
  color: #eae2b7;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  @media (max-width: 768px) {
    grid-column: 1 / span 1;
    grid-row: auto;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

function Header() {
  return (
    <HeaderContainer>
      <UserInfo>
        <Avatar src="https://via.placeholder.com/40" alt="User Avatar" />
        <span>Mr. Vitaliy</span>
      </UserInfo>
    </HeaderContainer>
  );
}

export default Header;
