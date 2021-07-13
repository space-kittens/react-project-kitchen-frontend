import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../constants/actionTypes';
import AllienAvatar from '../../ui/UserAvatar/UserAvatar';
import LikeToggler from '../LikeToggler/LikeToggler';
import Tags from '../Tags/Tags';

import { colorBase, colorText } from '../../scss/styles'
import { textStyles } from '../../scss/mixins'

const mapDispatchToProps = (dispatch) => ({
  favorite: (slug) =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: agent.Articles.favorite(slug),
    }),
  unfavorite: (slug) =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: agent.Articles.unfavorite(slug),
    }),
});

const ArticlePreview = ({article, unfavorite, favorite}) => {
  const {
    favorited,
    slug,
    createdAt,
    favoritesCount,
    title,
    description,
    tagList,
    author: {username}
  } = article;

  const handleClick = (ev) => {
    ev.preventDefault();
    if (favorited) {
      unfavorite(slug);
    } else {
      favorite(slug);
    }
  };

  return (
    <Article>
      <Header>
        <CenteredItemsFlexHelper>
          <Link to={`/@${username}`}>
            <AllienAvatar width='32' height='32' alt={username} />
          </Link>

          <ColumnFlexWrapper>
            <Link to={`/@${username}`}>
              {username}
            </Link>
            <PublishTime dateTime={ new Date( createdAt ).toISOString() }>
              { new Date( createdAt ).toLocaleDateString('ru') }
            </PublishTime>
          </ColumnFlexWrapper>
        </CenteredItemsFlexHelper>

        <LikeToggler isActive={favorited} onClick={handleClick}>
          {favoritesCount}
        </LikeToggler>
      </Header>

      <Link to={`/article/${slug}`}>
        <H2>{title}</H2>
        <Description>{description}</Description>
      </Link>
      <FlexHelper>
        <Link to={`/article/${slug}`}>
          <ReadMore>Продолжить чтение...</ReadMore>
        </Link>
        <TagsWrapper>
          <Tags articleTags={ tagList } />
        </TagsWrapper>
      </FlexHelper>
    </Article>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);

const Article = styled.article`
  padding: 32px 0;
  box-shadow: inset 0 -1px 0 #2F2F37;
`;

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const H2 = styled.h2`
  ${textStyles.headline}

  margin-top: 0;
  margin-bottom: 8px;
`;

const Description = styled.p`
  margin-top: 0;
  margin-bottom: 16px;
  color: ${colorText.secondary};
`;

const ReadMore = styled.p`
  display: inline-block;
  margin: 0;
  color: ${colorBase.accent};
`;

const TagsWrapper = styled.div`
  max-width: 76%;
`;

const ColumnFlexWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const CenteredItemsFlexHelper = styled.div`
  display: flex;
  align-items: center;
`;

const FlexHelper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const PublishTime = styled.time`
  ${textStyles.caption}

  color: ${colorText.secondary};
`;
