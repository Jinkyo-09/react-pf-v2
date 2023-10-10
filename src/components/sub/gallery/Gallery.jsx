import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const refInput = useRef(null);
	const [Pics, setPics] = useState([]);
	const [Loader, setLoader] = useState(true);
	const my_id = '199299808@N06';

	const fetchData = async (opt) => {
		let url = '';
		const api_key = '2a1a0aebb34012a99c23e13b49175343';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 100;

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
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}

		const data = await fetch(url);
		const json = await data.json();
		console.log(json.photos.photo);
		if (json.photos.photo.length === 0) {
			return alert('검색어에 해당하는 이미지를 찾을수 없습니다.');
		}

		setPics(json.photos.photo);
	};

	useEffect(() => {
		//type: 'interest' 인터레스트 방식 갤러리 호출
		//type: 'user' 사용자 아이디 계정의 갤러리 호출
		//type: 'serch' 검색키워드로 갤러리 호출
		//fetchData({ type: 'user', id: my_id });
		//fetchData({ type: 'interest' });
		fetchData({ type: 'user', id: my_id });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<div className='searchBox'>
				<form
					onSubmit={(e) => {
						//submit이벤트의 기본 서버 전송기능을 막아줌
						e.preventDefault();
						//문자열.trim() : 문자열앞뒤로 빈칸을 제거해서 정리
						if (refInput.current.value.trim() === '') {
							return alert('검색어를 입력하세요.');
						}

						fetchData({ type: 'search', tags: refInput.current.value });
						refInput.current.value = '';
					}}
				>
					<input ref={refInput} type='text' placeholder='검색어를 입력하세요' />
					<button>검색</button>
				</form>
			</div>

			<div className='btnSet'>
				<button onClick={() => fetchData({ type: 'user', id: my_id })}>My Gallery</button>
				<button onClick={() => fetchData({ type: 'interest' })}>Interest Gallery</button>
			</div>

			{Loader ? (
				<img className='loading' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loading' />
			) : (
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
											<img
												src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
												alt={data.owner}
												onError={(e) => {
													e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
												}}
											/>
											<span onClick={() => fetchData({ type: 'user', id: data.owner })}>{data.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			)}
		</Layout>
	);
}
