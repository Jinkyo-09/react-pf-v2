import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Youtube.module.scss';
import { useEffect, useState } from 'react';

/**
	리액트는 단방향 데이터 바인딩
	-부모에서 자식으로 데이터 전달 가능, 자식에서 부모로 데이터를 전달 불가
	-props 전당, children 전달

	리액트에서 자식 컴포넌트에서는 직접적으로 부모컴포넌트의 state값 변경이 불가
	- 해결방법 : 부모의 state변경함수를 자식컴포넌트로 전달
	-자식 컴포넌트에서는 전달받은 state변경함수로 간접적으로 부모 state값 변경 가능
 */

export default function Youtube() {
	const [Youtube, setYoutube] = useState([]);
	const [IsModal, setIsModal] = useState(false);

	const fetchYoutube = () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
		//const pid = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
		const pid = 'PL2pfG9YtKxMJVwlAjAIV9TBF5-44WnQ-q';
		const num = 5;
		const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		fetch(resultURL)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				setYoutube(json.items);
			});
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<>
			<Layout title={'Youtube'}>
				{Youtube.map((data, idx) => {
					return (
						<article key={idx}>
							<h2>{data.snippet.title}</h2>
							<p>{data.snippet.description}</p>
							<div className='pic' onClick={() => setIsModal(true)}>
								<img src={data.snippet.thumbnails.standard.url} alt={data.title} />
							</div>
						</article>
					);
				})}
			</Layout>
			{IsModal && (
				<Modal setIsModal={setIsModal}>
					<h1>팝업</h1>
				</Modal>
			)}
			)}
		</>
	);
}
