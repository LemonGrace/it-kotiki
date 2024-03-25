import { Navigate, Outlet, useLocation, useOutletContext } from 'react-router';
import { EPATH } from '../../../models/models';
import { ReactElement } from 'react';

export const ProtectedRoute = (): ReactElement | null => {
	const location = useLocation();
	const { openNotification } = useOutletContext();

	if (localStorage.getItem('auth') !== 'true') {
		return <Navigate to={EPATH.SIGN_IN} state={{ from: location }} />;
	}

	return <Outlet context={{ openNotification }} />;
};
