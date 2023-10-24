export interface IPaginationProps {
  page: number;
  limit: number;
  sort: string;
  order: string;
}

export interface IPaginationResponse {
  page: number;
  size: number;
  count: number;
  total_page: number;
}
