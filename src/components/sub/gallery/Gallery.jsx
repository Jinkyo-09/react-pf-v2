import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const my_id = '199299808@N06';

	const fetchData = async (opt) => {
		let url = '';
		const api_key = '2a1a0aebb34012a99c23e13b49175343';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const num = 50;

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
		}

		//fetching함수 호출시 타입값이 있는 객체를 인수로 전달하면 해당 타입에 따라 호출 URL이 변경되고
		//해당URL을 통해 받아지는 데이터로 달라짐
		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
		}

		const data = await fetch(url);
		const json = await data.json();
		console.log(json.photos.photo);
		setPics(json.photos.photo);
	};

	useEffect(() => {
		//type: 'interest' 인터레스트 방식 갤러리 호출
		//type: 'user' 사용자 아이디 계정의 갤러리 호출
		fetchData({ type: 'user', id: my_id });
		//fetchData({ type: 'interest' });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<button onClick={() => fetchData({ type: 'user', id: my_id })}>My Gallery</button>
			<button onClick={() => fetchData({ type: 'interest' })}>Interest Gallery</button>

			<div className='picFrame'>
				<Masonry
					elementType={'div'} // masonry 컴포넌트가 변환될 태그명 지정
					options={{ transitionDuration: '0.5s' }} // 박스 모션시 트랜지션 시간 설정
					disableImagesLoaded={false} // true 이미지 로딩처리 안함
					updateOnEachImageLoad={false} // true 각 이미지의 로딩 처리 안함
				>
					{Pics.map((data, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<img
										className='pic'
										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
									/>
									<h2>{data.title}</h2>

									<div className='profile'>
										<img src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`} alt={data.owner} />
										<span onClick={() => fetchData({ type: 'user', id: data.owner })}>{data.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
