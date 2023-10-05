import Layout from '../../common/layout/Layout';
import './Youtube.module.scss';
import { useEffect, useState } from 'react';

export default function Youtube() {
	const api_key = 'AIzaSyBzu-DiHzM7s-z6s-Elyy24zf2bBrf6ckk';
	const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
	const pid = 'PL2pfG9YtKxMJVwlAjAIV9TBF5-44WnQ-q';
	const num = 5;
	const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	useEffect(() => {
		fetch();
	}, []);

	return (
		<Layout title={'Youtube'}>
			<p>유튜브 페이지입니다.</p>
		</Layout>
	);
}
