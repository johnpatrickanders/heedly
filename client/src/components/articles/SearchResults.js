import React from 'react';
import { useParams } from 'react-router-dom';
import TitleBarGridlist from './GridList';

export const SearchResults = () => {
  let { search } = useParams();
  return (
    <>
      {/* <TitleBarGridlist>
        Now Showing query: {search}

      </TitleBarGridlist> */}
    </>
  )
}
