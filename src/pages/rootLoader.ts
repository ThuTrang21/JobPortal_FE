import { redirect } from 'react-router-dom';
import { AnyType } from '../interfaces/common';
import { dispatchWaitAction } from '../store/helpers';
import { authentication } from '../store/auth/actions';

const defaultAuthOptions = {
  isAuthRoute: false,
  isPublicRoute: false,
  isPrivateRoute: false,
  visibleSite: [],
};

interface IRootLoader {
  authOptions?: Partial<typeof defaultAuthOptions>;
  loader?: () => void;
}

export default async function rootLoader({
  authOptions = defaultAuthOptions,
  loader = undefined,
}: IRootLoader) {
  const { data }: AnyType = await dispatchWaitAction(authentication(authOptions));

  if (data) return redirect(data);

  return loader ? loader() : null;
}
