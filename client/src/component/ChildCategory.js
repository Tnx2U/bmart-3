import React, { useState, useEffect, useRef, useContext } from 'react';
import Header from 'component/share/Header';
import ProductList from 'component/share/ProductList';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { PRODUCTS_BY_CHILD_CATEGORY_ID } from 'graphql/product';
import LoadingIcon from 'component/share/LoadingIcon';

function ChildCategory(props) {
  //--------------------스타일드 컴포넌트 구현 영역
  const Article = styled.article``;

  const ListControlBar = styled.div``;

  const ProductSection = styled.section`
    padding: 0 15px;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
  `;

  // hook 선언
  const splitUrl = props.location.pathname.split('/');
  const categoryId = parseInt(splitUrl[splitUrl.length - 1]);
  const [cursor, setCursor] = useState(0);
  const [ordertype, setOrdertype] = useState('id');
  const [limit, setLimit] = useState(8);
  const [lastProductId, setLastProductId] = useState(0);
  const [listDireaction, setListDireaction] = useState('ASC');
  const [productList, setProductList] = useState([]);
  const reloadRef = useRef();
  // const [fetching, setFetching] = useContext(FetchingContext);

  // 백엔드 데이터 요청
  const { loading: loadingProducts, error: errorProducts, data: products, refetch: refetchProducts } = useQuery(
    //아래 쿼리 자식 카테고리도 같은 이름으로 써야 하니까 수정해야 할듯
    PRODUCTS_BY_CHILD_CATEGORY_ID,
    {
      variables: {
        categoryId,
        id: lastProductId,
        cursor,
        ordertype,
        limit,
        direction: listDireaction,
      },
    }
  );

  const setIntersectionObserver = () => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        if (products) {
          setLastProductId(products.ProductsByChildCategoryId[products.ProductsByChildCategoryId.length - 1].id);
          setCursor(products.ProductsByChildCategoryId[products.ProductsByChildCategoryId.length - 1].id);
        }
        console.log('observer detect!');
      });
    });
    io.observe(document.querySelector('.reload-div'));
  };

  // 생명주기 함수
  useEffect(() => {
    if (products) {
      setProductList([...productList, products.ProductsByChildCategoryId]);
      // setProductList([...productList, ...products.ProductsByChildCategoryId]);
      // setProductList(...productList, products.ProductsByChildCategoryId);

      setIntersectionObserver();
    }
  }, [products]);

  console.log('productList : ', productList);
  console.log('products : ', products);

  //최초 1회 실행
  useEffect(() => {
    setIntersectionObserver();
  });

  return (
    <>
      <Header />
      <Article>
        <ProductSection>
          <ListControlBar />
          {productList.map((productItems) => (
            <ProductList productItems={productItems} />
          ))}
          {loadingProducts ? <div>제품정보를 가져오고 있어요!</div> : <LoadingIcon />}
          <div ref={reloadRef} className="reload-div">
            {/* 상세 카테고리 페이지 컴포넌트입니다. 해당 페이지의 카테고리 id는 {categoryId}입니다. */}
          </div>
        </ProductSection>
      </Article>
    </>
  );
}

export default ChildCategory;
