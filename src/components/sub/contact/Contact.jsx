import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { useRef, useEffect } from 'react';

export default function Contact() {
	const map = useRef(null);
	const { kakao } = window; //현재 카카오 객체를 cdn으로 가져오고 있기 때문에 리액트 컴포넌트 안쪽에서 윈도우 객체로부터 카카오 객체를 비구조화할당을 이용해서 수동으로 꺼내옴
	const mapOption = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	useEffect(() => {
		new kakao.maps.Map(map.current, mapOption);
	}, []);

	return (
		<Layout title={'Contact'}>
			<div className='map' ref={map}></div>
		</Layout>
	);
}
