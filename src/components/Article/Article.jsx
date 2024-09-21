const Article = ({ objectID, title, url }) => {
  return (
    <li key={objectID}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </li>
  );
};

export default Article;