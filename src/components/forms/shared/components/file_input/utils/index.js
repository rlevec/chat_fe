export const handleHandleAcceptedFormatsAction = (acceptedFormats) => {
  const acceptedFormatsArray = acceptedFormats?.split(",");

  const transformedAcceptedFomatsArray = acceptedFormatsArray?.map(
    (acceptedFormat) => {
      const fragmentedAcceptedFormat = acceptedFormat?.split("/");

      return fragmentedAcceptedFormat?.[fragmentedAcceptedFormat?.length - 1];
    }
  );

  const acceptedFormatsToRender = transformedAcceptedFomatsArray?.join(" | ");
  return acceptedFormatsToRender;
};

export const handleFileOnChangeEventAction = (
  event,
  frontendSlug,
  setQuery,
  setPreviewFile
) => {
  const selectedFile = event?.target?.files?.[0];

  if (selectedFile) {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [frontendSlug]: selectedFile,
    }));

    const fileUrl = URL.createObjectURL(selectedFile);
    if(fileUrl) setPreviewFile(fileUrl);

  } else {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [frontendSlug]: null,
    }));
    setPreviewFile(null);
  }
};


export const handleDeletePreviewFileAction = (frontendSlug, setQuery, setPreviewFile) => {
  setQuery((prevQuery) => ({
    ...prevQuery,
    [frontendSlug]: null,
  }));
  setPreviewFile(null);
}