interface IErrorMessage {
  message: string;
}

const ErrorMessage = ({ message }: IErrorMessage) => {
  return (
    <div className="rounded-b-lg bg-red-500/25 px-5 py-1 text-xs font-semibold text-red-500">
      {message}
    </div>
  );
};

export default ErrorMessage;
