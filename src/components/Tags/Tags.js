import React from 'react';
import agent from '../../agent';

import { connect } from 'react-redux';
import { APPLY_TAG_FILTER } from '../../constants/actionTypes';

import styled from 'styled-components';
import { listReset, textStyles } from '../../scss/mixins';
import { colorBase } from '../../scss/styles';

const mapStateToProps = (state) => ({
  appTags: state.home.tags,
  activeTag: state.articleList.tag
} );

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) => dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload })
} );

const Tags = ( { articleTags, appTags, activeTag, onClickTag } ) => {
  const tagsForRender = articleTags || appTags
  if (tagsForRender) {
    return (
      <TagList>
        {tagsForRender.map((tag) => {
          const handleClick = (ev) => {
            ev.preventDefault();
            onClickTag(tag, (page) => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
          };

          return (
            <TagListItem key={tag}>
              <Tag href='#' onClick={ handleClick } isActive={ activeTag === tag }>
              {tag}
              </Tag>
            </TagListItem>
          );
        })}
      </TagList>
    );
  } else {
    return <div>Загрузка тегов...</div>;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);

const TagList = styled.ul`
  ${listReset}

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-right: -4px;
  margin-bottom: -4px;
`;

const TagListItem = styled.li`
  margin-right: 4px;
  margin-bottom: 4px;
`;

const Tag = styled.a`
  ${textStyles.caption}

  padding: 4px 8px;
  background-color: ${({isActive}) => isActive ? colorBase.accent : colorBase.input};
  border-radius: 100px;

  &:hover,
  &:focus {
    background-color: ${colorBase.accent};
    outline: 0;
  };

  &:active {
    opacity: 0.5;
  }
`;
