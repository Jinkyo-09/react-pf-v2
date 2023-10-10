import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect } from 'react';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const api_key = '3a51324c9403091286ac4db141e1a6b8';
	const method_interest = 'flickr.interestingness.getList';
	const num = 50;
	const url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;

	useEffect(() => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.photos.photo);
				setPics(json.photos.photo);
			});
	}, []);

	return (
		<Layout title={'Gallery'}>
			<div className='picFrame'>
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
									<span>{data.owner}</span>
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}
