export const LanguageInitialValue = (updateId, oldData) => {
  return {
    name: updateId ? oldData?.name || "" : "",
    locale: updateId ? oldData?.locale || "" : "",
    is_rtl: updateId ? Boolean(Number(oldData?.is_rtl)) : false,
    status: updateId ? Boolean(Number(oldData?.status)) : true,
    flag: updateId ? oldData?.flag || "" : "",
  };
};
