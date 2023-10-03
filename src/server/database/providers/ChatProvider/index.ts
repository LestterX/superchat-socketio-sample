import * as createProvider from './Create'
import * as getByRoleProvider from './GetByRole'
import * as getAllProvider from './GetAll'
import * as getByIdProvider from './GetById'
import * as getNameByIdProvider from './GetNameById'

export const ChatProvider = {
    ...createProvider,
    ...getByRoleProvider,
    ...getAllProvider,
    ...getByIdProvider,
    ...getNameByIdProvider,
}