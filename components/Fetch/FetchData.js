import axios from "axios";

// 서버 주소
import { keys } from '../../env'

/**
 * 서버로부터 이미지를 가져오는 함수
 * @returns {Promise<Object>} - 서버에서 받은 이미지 데이터
 * @throws Will throw an error if the request fails.
 */
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

/**
 * 서버로부터 이미지를 색상 패치
 * @param {Object} imageData - 이미지 데이터
 * @returns {Promise<Object>} - 색상 정보
 * @throws Will throw an error if the request fails.
 */
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

/**
 * 서버로부터 상태를 받음
 * @param {Object} asset - 자산 데이터
 * @returns {Promise<Object>} - 상태 정보
 * @throws Will throw an error if the request fails.
 */
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

/**
 * /getInfo에 GET 요청 보내기
 * @param {Object} data - 요청 데이터
 * @returns {Promise<Object>} - 자산 정보
 * @throws Will throw an error if the request fails.
 */
export const getInfos = async (data) => {
    try {
        const response = await axios.post(`${keys.nodeURL}/getInfo`, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}

/**
 * /getColor에 GET 요청 보내기
 * @returns {Promise<Object>} - 색상 정보
 * @throws Will throw an error if the request fails.
 */
export const getColors = async () => {
    try {
        const response = await axios.get(`${keys.nodeURL}/getColor`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}

/**
 * /getScrapingAssets에 GET 요청 보내기
 * @returns {Promise<Object>} - 스크래핑된 자산 리스트
 * @throws Will throw an error if the request fails.
 */
export const getPrices = async () => {
    try {
        const response = await axios.get(`${keys.nodeURL}/getScrapingAssets`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}

/**
 * 자산 추가
 * @param {Object} data - 자산 데이터
 * @returns {Promise<Object>} - 자산 추가 결과
 * @throws Will throw an error if the request fails.
 */
export const addAsset = async (data) => {
    try {
        const response = await axios.post(`${keys.nodeURL}/addAsset`, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 상위로 다시 던지기
    }
}
