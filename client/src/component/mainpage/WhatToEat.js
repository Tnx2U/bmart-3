import React, { useContext, useRef, useEffect } from 'react';
import LoadingIcon from 'component/share/LoadingIcon';
import { GET_RAND_ITEMS } from 'graphql/product';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import ProductItem from 'component/share/ProductItem';
import { OuterContainer, HeaderContainer, Header } from 'component/share/ShareStyle';
import { MoreBtn } from 'component/mainpage/RecommendStyle';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const WhatToEat = () => {
  const limit = 20;
  const { loading, error, data: products } = useQuery(GET_RAND_ITEMS, {
    variables: { limit },
  });

  if (products !== undefined && products.GetRandItems.length === 0) return <div>ㅠㅠ...데이터가 없습니다</div>;
  if (error) return <div>ㅠㅠ...데이터 요청에 실패했습니다</div>;

  return (
    <>
      <HeaderContainer>
        <Header>지금 뭐 먹지?</Header>
        <StyledLink to="/event/what_to_eat">
          <MoreBtn>{'더보기 >'} </MoreBtn>
        </StyledLink>
      </HeaderContainer>
      <OuterContainer>
        {loading ? (
          <LoadingIcon />
        ) : (
          products.GetRandItems.map((item, idx) => <ProductItem content={item} key={`what-to-eat-${idx}`} row="one" />)
        )}
      </OuterContainer>
    </>
  );
};

export default WhatToEat;
