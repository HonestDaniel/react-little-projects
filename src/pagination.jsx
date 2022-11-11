import ReactPaginate from 'react-paginate';

export default function Pagination({ onChangePage }){
    return (
        <ReactPaginate
        className = "pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={1}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    )
}