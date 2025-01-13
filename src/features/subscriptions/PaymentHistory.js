// src/features/subscriptions/PaymentHistory.js
const PaymentHistory = ({ payments }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Payment History</h3>
      <ul>
        {payments.map((payment, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">{payment.date}</span>: $
            {payment.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;
