import { ReactElement } from "react";

export default function CircularSpinner(): ReactElement {
  return (
    <>
      <div className="flex flex-row space-x-4 justify-center items-center">
        <div className="w-14 h-14 max-sm:w-12 max-sm:h-12 rounded-full animate-spin border-[5px] border-solid border-blue-900 border-t-transparent"></div>
      </div>
    </>
  );
}
