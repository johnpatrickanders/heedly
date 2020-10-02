import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArticleList from './GridList';
import { thunks } from '../../store/marks';

export default function ({ match }) {
  const sourceId = match.params.sourceId;
  console.log("Source:", sourceId)

  const dispatch = useDispatch();

  const userId = useSelector(state => state.auth.id);


  useEffect(() => {
    (async () => {
      dispatch(thunks.dispatchAllReads(userId));
    })();
  }, []);


  const myReads = useSelector(state => state.marks.reads);

  if (!myReads) return null;
  console.log(myReads.articles);

  const setImgUrls = async () => {
    for (let i = 0; i < myReads.length; i++) {
      let article = myReads[i];
      let img = article.urlToImage;
      article.img = img;
    }
  }
  setImgUrls();


  return (
    <ArticleList articles={myReads.articles} subTitle={"My Reads:"}>

    </ArticleList >
  )
}
