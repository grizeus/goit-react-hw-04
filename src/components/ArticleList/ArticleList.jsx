import Article from "../Article/Article";

const ArticleList = ({ articles }) => {
  return (
    <ul>
      {articles.map(({ objectID, title, url }) => (
        <Article key={objectID} objectID={objectID} title={title} url={url} />
      ))}
    </ul>
  );
};

export default ArticleList;
