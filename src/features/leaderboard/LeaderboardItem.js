// src/features/leaderboard/LeaderboardItem.js
const LeaderboardItem = ({ user }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold">{user.name}</h3>
      <p className="mt-2">Points: {user.points}</p>
      <span className="mt-4 text-sm">{user.rank}</span>
    </div>
  );
};

export default LeaderboardItem;
