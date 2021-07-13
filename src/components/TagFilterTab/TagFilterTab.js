import React from 'react';
import { connect } from 'react-redux';

import Tab from '../../ui/Tab/Tab';

const mapStateToProps = (state) => ({
  tag: state.articleList.tag,
});

const TagFilterTab = ({tag}) => {
  if (!tag) {
    return null;
  }

  return (
    <Tab type="button" isActive={true}>
      {`#${tag}`}
    </Tab>
  );
};

export default connect(mapStateToProps)(TagFilterTab);
