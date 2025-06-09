// components/Table.jsx
import React from "react";

const Table = ({ columns, data, renderRow }) => {
  return (
    <div className="overflow-x-auto rounded-sm border border-gray-200">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="p-3 border-b">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) =>
            renderRow ? (
              renderRow(item, index)
            ) : (
              <tr
                key={index}
                className={`border-b hover:bg-gray-50 ${
                  index % 2 === 1 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {columns.map((col, idx) => (
                  <td key={idx} className="p-3">
                    {item[col.key]}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
