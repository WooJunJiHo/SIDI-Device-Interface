import axios from "axios";

//서버 주소
import { keys } from '../../env'






// Python Flask
// Python Flask
// Python Flask
// Python Flask
// Python Flask
// Python Flask
// Python Flask



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


// 서버로부터 상태를 받음
export const fetchCondition = async (asset) => {
    try {
        const response = await fetch(`${keys.flaskURL}/condition`, {
            method: 'POST', // POST 요청 설정
            headers: {
                'Content-Type': 'application/json' // JSON 형식의 데이터 전송
            },
            body: JSON.stringify(asset) // 빈 객체를 JSON 문자열로 변환하여 전송 (필요에 따라 데이터 추가 가능)
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








// Node JS
// Node JS
// Node JS
// Node JS
// Node JS
// Node JS
// Node JS


// /getInfo에 GET 요청 보내기 
export const getInfos = async (data) => {
    try {
        const response = await axios.post(`${keys.nodeURL}/getInfo`, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}

// /getColor에 GET 요청 보내기
export const getColors = async () => {
    try {
        const response = await axios.get(`${keys.nodeURL}/getColor`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}

// /getInfo에 GET 요청 보내기 
export const getPrices = async () => {
    try {
        const response = await axios.get(`${keys.nodeURL}/getScrapingAssets`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}


export const addAsset = async (data) => {
    try {
        const response = await axios.post(`${keys.nodeURL}/addAsset`, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}