// src/features/forums/ForumPost.js
const ForumPost = ({ post }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold">{post.title}</h3>
      <p className="mt-2">{post.content}</p>
      <div className="mt-4 flex justify-between">
        <span>{post.author}</span>
        <span>{post.date}</span>
      </div>
    </div>
  );
};

export default ForumPost;
