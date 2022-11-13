import ReactPaginate from 'react-paginate';

export default function Pagination({pageCount, onChangePage }){
    return (
        <ReactPaginate
        className = "pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected)}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    )
}