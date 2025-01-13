// src/features/live-sessions/LiveSessionCard.js
const LiveSessionCard = ({ session }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold">{session.title}</h3>
      <p className="mt-2">{session.date}</p>
      <button className="mt-4 bg-primary text-white px-4 py-2 rounded">
        Join Session
      </button>
    </div>
  );
};

export default LiveSessionCard;
