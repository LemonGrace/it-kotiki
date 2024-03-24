import { Route, Routes } from 'react-router';
import { Layout } from '../Layout/Layout';
import { Template } from '../Template/Template';
import { NotFound } from '../NotFound/NotFound';
import { EPAGE_TYPE, EPATH } from '../../models/models';
import { SignPage } from '../../pages/SignPage/SignPage';
import { Game } from '../../pages/Game/Game';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';

function App() {
	return (
		<Routes>
			<Route path={EPATH.MAIN} element={<Layout />}>
				<Route element={<ProtectedRoute />}>
					<Route index element={<Template />} />
					<Route path={EPATH.PROFILE} element={<ProfilePage />} />
					<Route path={EPATH.LEADER_BOARD} element={<Template />} />
					<Route path={EPATH.FORUM} element={<Template />} />
				</Route>
				<Route path={EPATH.ABOUT} element={<Template />} />
				<Route path={EPATH.LEADER_BOARD} element={<Template />} />
				<Route path={EPATH.FORUM} element={<Template />} />
				<Route path={EPATH.GAME} element={<Game />} />
				<Route path={EPATH.SIGN_UP} element={<SignPage type={EPAGE_TYPE.SIGNUP} />} />
				<Route path={EPATH.SIGN_IN} element={<SignPage type={EPAGE_TYPE.SIGNIN} />} />
				<Route path="/*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
