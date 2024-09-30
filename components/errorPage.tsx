import { useRouteError } from "react-router-dom";
import Header from "../components/Header";

export function ErrorElement(user: {email: string, telegram?: bigint} | null) {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Header user={user}/>
      <div className="grid justify-center mt-10">
        <h1 className="text-4xl font-extrabold">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="text-xl font-bold">
          <i>{error.status} {error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
