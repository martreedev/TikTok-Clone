const formatFileSize = (bytes: number): string => {
    const kb = bytes / 1024;
    return `${kb.toFixed(2)} KB`;
};
export default formatFileSize;