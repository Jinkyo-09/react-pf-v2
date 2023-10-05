import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { useRef, useEffect } from 'react';

export default function Contact() {
	const map = useRef(null);
	const { kakao } = window; //현재 카카오 객체를 cdn으로 가져오고 있기 때문에 리액트 컴포넌트 안쪽에서 윈도우 객체로부터 카카오 객체를 비구조화할당을 이용해서 수동으로 꺼내옴
	const mapOption = {
		center: new kakao.maps.LatLng(37.584761279713774, 126.88557369799524),
		//카카오맵api 샘플에서 클릭한 위치에 마커 생성하기->직접 해보기에서 좌표를 찍으면 더 자세한 좌표를 구할수 있음
		level: 1,
	};

	const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
	const imageSize = new kakao.maps.Size(232, 99);
	const imageOption = { offset: new kakao.maps.Point(116, 90) };
	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

	//마커 위치 인스턴스를 인술 전달해서 마커 출렷 인스턴스 객체를 생성
	const marker = new kakao.maps.Marker({
		position: mapOption.center,
		image: markerImage,
	});

	useEffect(() => {
		//컴포넌트 마운트 되자마자 지도인스턴스 생성
		const instance = new kakao.maps.Map(map.current, mapOption);
		//마커 출력 인스턴스에 지도 인스턴스 결합
		marker.setMap(instance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<div className='map' ref={map}></div>
		</Layout>
	);
}
