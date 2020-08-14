import React from "react";

const Header = ({ hasSearchBar }) => {
  return (
    <div>
      <header className="main-header">
        <div className="main-header-row-1">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
          <div>B mart</div>
          <div className="main-header-row-1-right">
            <i className="fa fa-search" aria-hidden="true"></i>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
        </div>
        {hasSearchBar ? (
          <div className="main-header-row-2">
            <div className="main-search-container">
              🔍
              <input placeholder="B마트 상품을 검색해보세요!" />
            </div>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
};

export default Header;
