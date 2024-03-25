export enum ESTUB_TYPE {
	NOT_FOUND = 'NOT_FOUND',
	INTERNAL_SERVICE_ERROR = 'INTERNAL_SERVICE_ERROR',
}

export const STUB_TITLE: Record<ESTUB_TYPE, string> = {
	NOT_FOUND: '404',
	INTERNAL_SERVICE_ERROR: '500',
};

export const STUB_TEXT: Record<ESTUB_TYPE, string> = {
	NOT_FOUND: 'К сожалению, запрашиваемая страница не найдена',
	INTERNAL_SERVICE_ERROR: 'Внутренняя ошибка сервера\n Мы о ней знаем и скоро исправим!',
};
