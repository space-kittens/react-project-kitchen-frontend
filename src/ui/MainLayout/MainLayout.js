import React from 'react';
import styled from 'styled-components';

import TagsCloud from '../TagsCloud/TagsCloud';

const MainLayout = ( { banner, children } ) => {
  return (
    <>
      { banner }
      <PtContainer>
        <FlexContainer>
          <MainContent>
            { children }
          </MainContent>
          <SideBar>
            <TagsCloud/>
          </SideBar>
        </FlexContainer>
      </PtContainer>
    </>
  );
};

export default MainLayout;

const PtContainer = styled.div`
  padding-top: 32px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  width: 75%;
  padding-right: 16px;
`;

const SideBar = styled.div`
  width: 25%;
  padding-left: 16px;
`;
