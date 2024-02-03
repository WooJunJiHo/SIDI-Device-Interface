import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';

//카메라
import { useCameraDevice, Camera } from 'react-native-vision-camera'



const CameraComponent = (props) => {

    //카메라 포맷
    const device = useCameraDevice('back');
    const camera = useRef(null);
    const [uri, setURI] = useState(null)


    // 권한을 요청한다.
    useEffect(() => {
        (async () => {
            const status = Camera.getCameraPermissionStatus();
            if (status !== 'granted') {
                await Camera.requestCameraPermission();
            }
        })();
    }, []);

    const takingPhotos = async () => {
        const photo = await camera.current.takePhoto({
            flash: 'auto', // 'on' | 'off'
            width: 600,     // 원하는 폭 (픽셀)
            height: 400,
        })
        const result = await fetch(`file://${photo.path}`)
        console.log(result.url)
        setURI(result.url)
    }

    //카메라 로딩
    if (device === null) return <ActivityIndicator size="large" color="#1C6758" />;

    //찍힌 사진 출력
    if (uri !== null) return (
        <>
            <Image style={styles.image} source={{ uri: uri }} />
            <TouchableOpacity
                style={styles.reBtn}
                onPress={() => {
                    setURI(null)
                }}
            >
                <Text style={styles.imageBtnText}>다시 찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.okBtn}
                onPress={() => {
                    props.onImageCallBack(uri)
                }}
            >
                <Text style={styles.imageBtnText}>사진 사용</Text>
            </TouchableOpacity>
        </>
    )

    //카메라
    return (
        <>
            <Camera
                style={StyleSheet.absoluteFill}
                ref={camera}
                device={device}
                photo={true}
                video={false}
                audio={false}
                isActive={true}
            />

            {/* 버튼 세션 */}
            <View
                style={[
                    styles.btnSection,
                ]}>
                <TouchableOpacity
                    style={styles.photoBtn}
                    onPress={() => takingPhotos()}
                >

                </TouchableOpacity>
            </View>
        </>

    );
};

export default CameraComponent;




const styles = StyleSheet.create({
    //촬영 버튼 세션
    btnSection: {
        width: '100%',
        height: '20%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoBtn: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 10,
        borderColor: 'white',
    },

    //이미지 세션
    image: {
        width: '100%',
        height: '100%',
    },
    reBtn: {
        position: 'absolute',
        bottom: 50,
        left: 50,
    },
    okBtn: {
        position: 'absolute',
        bottom: 50,
        right: 50,
    },
    imageBtnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})