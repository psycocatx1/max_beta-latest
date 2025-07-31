import { useTranslations } from "next-intl"
import { useToast } from "../useToast"
export { QUERY_KEYS } from './query-keys';

export const useCommon = () => {
  const main_toast = useToast()
  const tCommon = useTranslations('common')

  return {
    ...main_toast,
    createdSuccessfully: () => main_toast.success(tCommon('created_successfully')),
    updatedSuccessfully: () => main_toast.success(tCommon('updated_successfully')),
    deletedSuccessfully: () => main_toast.success(tCommon('deleted_successfully')),
    errorWhileCreating: (error: Error) => {
      main_toast.error(tCommon('error_while_creating'));
      console.error(error)
    },
    errorWhileUpdating: (error: Error) => {
      main_toast.error(tCommon('error_while_pdating'));
      console.error(error);
    },
    errorWhileDeleting: (error: Error) => {
      main_toast.error(tCommon('error_while_deleting'));
      console.error(error);
    },
  }
}