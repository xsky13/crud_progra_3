import { NavLink } from "react-router";
import { Spinner } from "./ui/spinner";
import type { NavLinkProps } from "react-router";

type AppNavLinkProps = Omit<NavLinkProps, "children"> & {
    children:
        | React.ReactNode
        | ((props: {
              isActive: boolean;
              isPending: boolean;
              isTransitioning: boolean;
          }) => React.ReactNode);
};

export function AppLink({ to, children, ...props }: AppNavLinkProps) {
    return (
        <NavLink to={to} {...props}>
            {(renderProps) => (
                <>
                    {renderProps.isPending && <Spinner />}
                    {typeof children === "function"
                        ? children(renderProps)
                        : children}
                </>
            )}
        </NavLink>
    );
}
