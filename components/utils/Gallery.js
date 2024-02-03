import { launchImageLibrary } from 'react-native-image-picker';

// 이미지 가져오기
export const onSelectImage = () => {
    return new Promise((resolve, reject) => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 512,
                maxHeight: 512,
                includeBase64: true,
            },
            (response) => {
                if (response.didCancel) {
                    reject('Image selection canceled');
                } else if (response.errorCode) {
                    reject(`Image Error: ${response.errorCode}`);
                } else {
                    resolve(response.assets[0].uri);
                }
            }
        );
    });
};
