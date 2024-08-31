import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectisRegisterIn,
  selectIsRefreshing,
  selectIsToken,
} from '../redux/auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRegisterIn = useSelector(selectisRegisterIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const token = useSelector(selectIsToken);

  return {
    isLoggedIn,
    isRegisterIn,
    isRefreshing,
    user,
    token,
  };
};
