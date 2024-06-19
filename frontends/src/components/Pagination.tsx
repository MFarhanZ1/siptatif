
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  totalItems,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps
) {

  // const handleClick = (page: number) => {
  //   onPageChange(page);
  // };

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(
  //       <button
  //         key={i}
  //         onClick={() => handleClick(i)}
  //         className={`${i} === ${currentPage} ? "active" : "" bg-[#F2F7F5] border border-black rounded-md px-3 py-1`}
  //       >
  //         {i}
  //       </button>
  //     );
  //   }
  //   return pageNumbers;
  // };
  return (
    <div className="flex flex-col gap-2 w-full font-poppins select-none">
      <div className="flex justify-end items-end w-full gap-3">
        <div className="flex justify-end gap-2 w-full">
          <button onClick={() => {
            if (Number(currentPage)-1 > 0){
              onPageChange(Number(currentPage) - 1)
            }
          }} className={`bg-[#ffc35b] hover:bg-[#e1ac51] disabled:bg-[#ffc35b] border border-black rounded-md px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none`}
            disabled={Number(currentPage) - 1 <= 0}
          >
            <p>Prev</p>
          </button>

          <button onClick={() => {
            if (Number(currentPage)+1 <= totalPages){
              onPageChange(Number(currentPage) + 1)
            }
          }} className={`bg-[#90ff7a] hover:bg-[#5ca34d] disabled:hover:bg-[#90ff7a] border border-black rounded-md px-3 py-1 hover:rounded-md disabled:disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={Number(currentPage) + 1 > totalPages}
          >
            <p>Next</p>
          </button>
        </div>
      </div>

      <span className="text-sm text-end text-gray-700 dark:text-gray-400 pr-[0.8px]">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{((currentPage-1)*20)+1}</span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{currentPage == totalPages ? totalItems : (currentPage*20)}</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span>{" "}
        Entries
      </span>
    </div>
  );
}

export default Pagination;
