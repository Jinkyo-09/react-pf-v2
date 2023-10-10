import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const refFrame = useRef(null);
	const refInput = useRef(null);
	const refBtnSet = useRef(null);
	const [Pics, setPics] = useState([]);
	const [Loader, setLoader] = useState(true);
	const my_id = '199299808@N06';

	const fetchData = async (opt) => {
		setLoader(true);
		refFrame.current.classList.remove('on');
		let url = '';
		const api_key = '2a1a0aebb34012a99c23e13b49175343';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 50;

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

		if (json.photos.photo.length === 0) {
			return alert('해당 검색어의 결과값이 없습니다.');
		}
		//실제 데이터가 state에 담기는 순간 가상돔이 생성되는 순간
		setPics(json.photos.photo);

		let count = 0;
		const imgs = refFrame.current?.querySelectorAll('img');

		imgs.forEach((img, idx) => {
			img.onload = () => {
				++count;
				console.log('현재 로딩된 img갯수', count);
				if (count === imgs.length) {
					console.log('모든 이미지 소스 렌더링 완료!');
					//모든 소스이미지라 렌더링완료되면 Loader값을 false로 바꿔서 로딩이미지 제거
					setLoader(false);
					refFrame.current.classList.add('on');
				}
			};
		});
	};

	useEffect(() => {
		fetchData({ type: 'user', id: my_id });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<div className='searchBox'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
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

			<div className='btnSet' ref={refBtnSet}>
				<button
					className='on'
					onClick={(e) => {
						//각 버튼 클릭시 해당 버튼에 만약 on클래스가 있으면 이미 활성화 되어 있는 버튼이므로 return으로 종료해서
						//fetchData함수 호출 방지
						if (e.target.classList.contains('on')) return;
						//클릭한 버튼요소에 on이없으면 해당 버튼활성화
						const btns = refBtnSet.current.querySelectorAll('button');
						btns.forEach((btn) => btn.classList.remove('on'));

						e.target.classList.add('on');
						fetchData({ type: 'user', id: my_id });
					}}
				>
					My Gallery
				</button>
				<button
					onClick={(e) => {
						//각 버튼 클릭시 해당 버튼에 만약 on클래스가 있으면 이미 활성화 되어 있는 버튼이므로 return으로 종료해서
						//fetchData함수 호출 방지
						if (e.target.classList.contains('on')) return;
						//클릭한 버튼요소에 on이없으면 해당 버튼활성화
						const btns = refBtnSet.current.querySelectorAll('button');
						btns.forEach((btn) => btn.classList.remove('on'));

						e.target.classList.add('on');
						fetchData({ type: 'interest' });
					}}
				>
					Interest Gallery
				</button>
			</div>

			{/* Loader가 true일때에만 로딩 이미지 출력 */}
			{Loader && <img className='loading' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loading' />}
			<div className='picFrame' ref={refFrame}>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }} disableImagesLoaded={false} updateOnEachImageLoad={false}>
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
												//만약 사용자가 프로필 이미지를 올리지 않았을때 엑박이 뜨므로
												//onError이벤트를 연결해서 대체이미지 출력
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
		</Layout>
	);
}
