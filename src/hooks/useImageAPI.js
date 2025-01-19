
const useImageAPI =() => {
    const imageUploadAPI = (`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_fileAPI}`);
    return imageUploadAPI
};

export default useImageAPI;