import { forEach, isObject, isString, omit, set } from 'lodash';
const rawRoutes = {
  HOME: '/',
  JOBSEEKER: {
    DEFAULT: '/job/:id',
  },
  ACCOUNT: {
    DEFAULT: "/taikhoan",
    PROFILE: "/profile",
  },
  EMPLOYER: {
    DEFAULT: '/ntd',
    LOGIN: '/login',
    REGISTER: '/register',
    MANAGEPOST: '/manage-post',
    CREATEPOST: '/create-post',
    PROFILE: '/profile',
    SAVEDPROFILE: '/saved-profile',
    ACCOUNTINFOR: '/account-info',
    COMPANYINFOR: '/company-info',
  },
  ERROR_404: '*',
} as const;

type FlattenRoutes<T, P extends string = ''> = {
  [K in keyof T]: T[K] extends string
  ? `${P}${K & string}`
  : T[K] extends Record<string, any>
  ? `${P}${K & string}` | FlattenRoutes<T[K], `${P}${K & string}_`>
  : never;
}[keyof T];

type MakeFinalRoutes<T> = {
  [K in FlattenRoutes<T>]: string;
};

type FinalRoutes = MakeFinalRoutes<typeof rawRoutes>;

const getFinalRoutes = (): FinalRoutes => {
  const result: FinalRoutes | any = {};

  forEach(rawRoutes, (route, key) => {
    if (isString(route)) set(result, key, route);
    if (isObject(route)) {
      if (route.DEFAULT) {
        set(result, key, route.DEFAULT);

        const obj = omit(route, 'DEFAULT');

        forEach(obj, (val, childKey) => {
          set(result, `${key}_${childKey}`, `${route.DEFAULT}${val}`);
        });
      }
    }
  });

  return result;
};

export const routes = getFinalRoutes();