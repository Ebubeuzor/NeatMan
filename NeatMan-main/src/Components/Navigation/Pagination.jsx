import React from 'react';
import { Pagination as AntPagination } from 'antd';

const Pagination = ({ meta, onPageChange }) => {
  const { current_page, total, per_page } = meta;

  const totalPages = Math.ceil(total / per_page);


  return (
    <div className="flex mt-4">
      <AntPagination
        current={current_page}
        total={total}
        pageSize={per_page}
        onChange={onPageChange}
        showSizeChanger={false}
        showQuickJumper={false}
      />
    </div>
  );
};

export default Pagination;
