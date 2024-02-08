import io from 'socket.io-client';

//서버 주소
import { REACT_APP_SERVER_URL } from '@env'


const socket = io(REACT_APP_SERVER_URL); // 서버 주소에 맞게 변경





// 이벤트 핸들러를 매개변수로 받도록 수정
export const loadMessage = (handleMessage, unregister = false) => {
    if (unregister) {
        // 언마운트 시에 이벤트 핸들러를 제거
        socket.off('chat message', handleMessage);
    } else {
        // 마운트 시에 이벤트 핸들러를 등록
        socket.on('chat message', handleMessage);
    }
};


export const sendMessage = (msg, user) => {
    socket.emit('chat message', {message: msg, user: user});
}






