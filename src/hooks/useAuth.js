import { useSelector } from 'react-redux';
import {
  selectisRegisterIn,
  selectIsLoading,
  selectIsLoggedIn,
  selectIsToken,
  selectUser,
  selectIsRefreshing,
  selectIsError,
} from '../redux/auth/selectors';

export const useAuth = () => {
  const isRegisterIn = useSelector(selectisRegisterIn);
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const token = useSelector(selectIsToken);
  const error = useSelector(selectIsError);

  return {
    isRegisterIn,
    isLoading,
    isLoggedIn,
    token,
    user,
    isRefreshing,
    error,
  };
};
