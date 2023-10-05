import './Modal.scss';
import { forwardRef, useState, useImperativeHandle } from 'react';
//forwardRef : forwardRef((ref,props)=>{})
//forwardRef 안쪽에서 ref로 연결한 요소를 역으로 부모 컴포넌트에 전달 가능 (자식 컴포넌트의 jsx 요소를 부모로 전달)

const Modal = forwardRef(({ children }, ref) => {
	const [Open, setOpen] = useState(false);
	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	return (
		<>
			{Open && (
				<aside className='modal'>
					<div className='con'>{children}</div>
					<span onClick={() => setOpen(false)}>close</span>
				</aside>
			)}
		</>
	);
});

export default Modal;
