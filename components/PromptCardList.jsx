import PromptCard from "./PromptCard";

const PromptCardList = ({ posts, profileClick, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          profileClick={profileClick}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
