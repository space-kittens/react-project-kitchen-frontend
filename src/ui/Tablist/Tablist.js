import styled from 'styled-components';

import { listReset } from '../../scss/mixins';

const TabList = styled.ul`
  ${listReset}

  display: flex;
  box-shadow: inset 0 -1px 0 #2F2F37;
`;

export default TabList;
