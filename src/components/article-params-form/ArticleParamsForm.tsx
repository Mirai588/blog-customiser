import { ArrowButton } from '../../components/arrow-button';
import { Button } from '../../components/button';

import styles from './ArticleParamsForm.module.scss';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Select } from '../select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../../src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Spacing } from '../spacing';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLElement>(null);

	const toggle = () => {
		if (isOpen) setIsOpen(false);
		else setIsOpen(true);
	};

	const handleEscKey = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
			// console.log('я закрылся');
		}
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
			// console.log('я закрылся');
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
					<Select
						title='Шрифт'
						selected={fontFamilyOptions[0]}
						options={fontFamilyOptions}
					/>
					<Spacing size={50} />
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
						title='Размер шрифта'
					/>
					<Spacing size={50} />
					<Select
						title='Цвет шрифта'
						selected={fontColors[0]}
						options={fontColors}
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						title='Цвет фона'
						selected={backgroundColors[0]}
						options={backgroundColors}
					/>
					<Spacing size={50} />
					<Select
						title='Ширина контента'
						selected={contentWidthArr[0]}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
