export const  defaultAvatarUrl = 'http://localhost:8080/default.jpg';
export const userAvatarUrl = (userId) => {
    return `https://firebasestorage.googleapis.com/v0/b/phobos-85710.appspot.com/o/account%2Fprofile%2Fpicture%2F${userId}?alt=media&token=1f425ade-6768-47ad-bcaf-612b0f444c17`;
};