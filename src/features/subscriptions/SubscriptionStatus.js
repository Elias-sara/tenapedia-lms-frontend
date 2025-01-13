// src/features/subscriptions/SubscriptionStatus.js
const SubscriptionStatus = ({ status }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Subscription Status</h3>
      <p>Status: {status}</p>
    </div>
  );
};

export default SubscriptionStatus;
