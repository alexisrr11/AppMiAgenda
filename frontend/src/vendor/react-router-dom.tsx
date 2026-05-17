/* eslint-disable react-refresh/only-export-components */
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

type LocationState = Record<string, unknown> | null;

interface RouterLocation {
  pathname: string;
  search: string;
  hash: string;
  state: LocationState;
}

interface NavigateOptions {
  replace?: boolean;
  state?: LocationState;
}

interface RouterContextValue {
  location: RouterLocation;
  navigate: (to: string, options?: NavigateOptions) => void;
}

interface BrowserRouterProps {
  children: ReactNode;
}

interface RoutesProps {
  children: ReactNode;
}

interface RouteProps {
  path: string;
  element: ReactNode;
}

interface NavigateProps extends NavigateOptions {
  to: string;
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  state?: LocationState;
  replace?: boolean;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

const getCurrentLocation = (): RouterLocation => ({
  pathname: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash,
  state: (window.history.state?.usr as LocationState) ?? null,
});

const normalizePath = (path: string) => {
  if (path === '*') {
    return path;
  }

  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
};

const useRouterContext = () => {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error('Router hooks must be used inside BrowserRouter.');
  }

  return context;
};

export const BrowserRouter = ({ children }: BrowserRouterProps) => {
  const [location, setLocation] = useState<RouterLocation>(() => getCurrentLocation());

  useEffect(() => {
    const handlePopState = () => setLocation(getCurrentLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: NavigateOptions) => {
    const url = new URL(to, window.location.origin);
    const historyState = { usr: options?.state ?? null };

    if (options?.replace) {
      window.history.replaceState(historyState, '', url);
    } else {
      window.history.pushState(historyState, '', url);
    }

    setLocation(getCurrentLocation());
  }, []);

  const value = useMemo(
    () => ({
      location,
      navigate,
    }),
    [location, navigate],
  );

  return <RouterContext value={value}>{children}</RouterContext>;
};

export const Routes = ({ children }: RoutesProps) => {
  const { location } = useRouterContext();
  const currentPath = normalizePath(location.pathname);
  const routeElements = Children.toArray(children).filter(isValidElement<RouteProps>);
  const fallback = routeElements.find((child) => child.props.path === '*');
  const matchedRoute = routeElements.find((child) => {
    return child.props.path !== '*' && normalizePath(child.props.path) === currentPath;
  });

  return matchedRoute?.props.element ?? fallback?.props.element ?? null;
};

export const Route = (props: RouteProps) => {
  return <>{props.element}</>;
};

export const Navigate = ({ to, replace, state }: NavigateProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace, state });
  }, [navigate, replace, state, to]);

  return null;
};

export const Link = ({ to, state, replace, onClick, children, ...props }: LinkProps) => {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    navigate(to, { replace, state });
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export const useNavigate = () => {
  return useRouterContext().navigate;
};

export const useLocation = () => {
  return useRouterContext().location;
};

export const Outlet = () => null;

export type { LocationState, NavigateOptions, RouteProps };
