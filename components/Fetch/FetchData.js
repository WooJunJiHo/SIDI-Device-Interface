import axios from "axios";

//서버 주소
import { keys } from '../../env'






// 서버로부터 이미지를 가져오는 함수
export const fetchImages = async () => {
    try {
        const response = await fetch(`${keys.flaskURL}/capture`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // 서버 응답을 JSON으로 파싱
        return data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error; // 예외를 다시 던져서 호출하는 쪽에서 처리할 수 있도록 함
    }
}


// 서버로부터 이미지를 색상 패치
export const fetchColor = async (imageData) => {
    try {
        const response = await fetch(`${keys.flaskURL}/color`, {
            method: 'POST', // POST 요청 설정
            headers: {
                'Content-Type': 'application/json' // JSON 형식의 데이터 전송
            },
            body: JSON.stringify(imageData) // 빈 객체를 JSON 문자열로 변환하여 전송 (필요에 따라 데이터 추가 가능)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // 서버 응답을 JSON으로 파싱
        return data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error; // 예외를 다시 던져서 호출하는 쪽에서 처리할 수 있도록 함
    }
}