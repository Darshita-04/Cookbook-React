import type {PaginationProps} from '../types/recipe'

const Pagination = ({currentPage,totalPages,changePage}:PaginationProps) => {
  return (
    <div className='pagination flex-center'>
      <button className='btn btn-sm' onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      <span>Page { currentPage } / { totalPages }</span>
      <button className='btn btn-sm' onClick={() => changePage(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
    </div>
  )
}

export default Pagination