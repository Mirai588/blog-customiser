import { ArrowButton } from '../../components/arrow-button';
import { Button } from '../../components/button';

import styles from './ArticleParamsForm.module.scss';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(true);
	const formRef = useRef<HTMLElement>(null);

	const toggle = () => {
		if (isOpen) setIsOpen(false);
		else setIsOpen(true);
	};

	const handleEscKey = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
			console.log('я закрылся');
		}
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
			console.log('я закрылся');
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleEscKey);
			document.addEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('keydown', handleEscKey);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
