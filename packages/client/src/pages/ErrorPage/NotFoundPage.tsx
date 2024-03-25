import { FC } from 'react';
import { ErrorStub } from '../../components/ErrorStub/ErrorStub';
import { ESTUB_TYPE } from '../../components/ErrorStub/models/models';

export const NotFoundPage: FC = () => <ErrorStub type={ESTUB_TYPE.NOT_FOUND} />;
