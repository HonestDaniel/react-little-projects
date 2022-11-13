import ReactPaginate from 'react-paginate';

export default function Pagination({pageCount, onChangePage }){
    return (
        <ReactPaginate
        className = "pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    )
}