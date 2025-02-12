const NoData = ({ message = "No records found" }) => (
  <div className="text-gray-500 text-center py-4">
    <p className="text-lg font-medium">{message}</p>
  </div>
);

export default NoData;
