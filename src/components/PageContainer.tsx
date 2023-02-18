import { Link } from "react-router-dom";

interface PageContainerProps {
  title: string;
  buttonText?: string;
  redirectPath?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function PageContainer({
  title,
  buttonText,
  redirectPath,
  icon,
  children,
}: PageContainerProps) {
  return (
    <>
      <div className="max-w-screen-xl p-8 m-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {buttonText && redirectPath && (
            <Link
              to={redirectPath}
              className="flex items-center px-4 py-2 transition-colors duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              {icon}
              <span className="ml-2 font-bold">{buttonText}</span>
            </Link>
          )}
        </div>
        {children}
      </div>
    </>
  );
}

export default PageContainer;
