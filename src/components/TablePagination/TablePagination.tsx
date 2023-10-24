import { useAdminShipping } from "@/store/adminShipping/useAdminShipping";

interface IPagination {
  onClickChangePage: (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string,
    value: number,
  ) => void;
  onClickNextChangePage: (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string,
  ) => void;
}

function TablePagination({
  onClickChangePage,
  onClickNextChangePage,
}: IPagination) {
  const pageInformation = useAdminShipping.use.pagination();
  console.log(pageInformation);

  if (!pageInformation) {
    return null;
  }

  const isFirstDisabled = pageInformation.page === 1;
  const isNextDisabled = pageInformation.page === pageInformation.total_page;

  const shownButton =
    pageInformation.page === 1 ||
    (pageInformation.page === pageInformation.total_page &&
      pageInformation.total_page <= 3)
      ? [1, 2, 3]
      : pageInformation.page === pageInformation.total_page
      ? [
          pageInformation.page - 2,
          pageInformation.page - 1,
          pageInformation.page,
        ]
      : [
          pageInformation.page - 1,
          pageInformation.page,
          pageInformation.page + 1,
        ];
  return (
    <div className="absolute bottom-5 left-0 right-0 m-auto w-fit rounded-lg">
      <button
        onClick={(e) => onClickChangePage(e, "page", 1)}
        disabled={isFirstDisabled}
        className={`h-[2.6rem] w-[5.2rem] rounded-l-lg border-x-[1px] border-y-[1px] border-prim-light font-bold transition-colors hover:bg-prim-light hover:text-prim-libg disabled:border-muted-text disabled:bg-muted-bg disabled:text-muted-text`}
      >
        First
      </button>
      {shownButton.map((number, index) => (
        <button
          disabled={number > pageInformation.total_page}
          onClick={(e) => onClickChangePage(e, "page", number)}
          className={`${
            number === pageInformation.page
              ? "bg-prim-light text-white"
              : "text-primary-bg bg-white transition-colors hover:bg-prim-light/20 hover:transition-colors"
          } ${
            index === 1 && "border-x-[1px]"
          } h-[2.6rem] w-[2.6rem] border-y-[1px] border-prim-light font-bold disabled:border-muted-text disabled:bg-muted-bg disabled:text-muted-text`}
          key={number}
        >
          {number}
        </button>
      ))}
      <button
        onClick={(e) => onClickNextChangePage(e, "page")}
        disabled={isNextDisabled}
        className="h-[2.6rem] w-[5.2rem] rounded-r-lg border-x-[1px] border-y-[1px] border-prim-light font-bold transition-colors hover:bg-prim-light hover:text-prim-libg disabled:border-muted-text disabled:bg-muted-bg disabled:text-muted-text"
      >
        Next
      </button>
    </div>
  );
}

export default TablePagination;
