const TodoSkeleton = () => {
  return (
    <tr className="animate-pulse">
      <td className="p-3">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-48"></div>
      </td>
      <td className="p-3 flex space-x-2">
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
};

export default TodoSkeleton;
