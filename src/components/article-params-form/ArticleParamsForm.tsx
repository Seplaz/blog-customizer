import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const handleToggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		setFontFamily(option);
	};

	const handleSetFontSize = (option: OptionType) => {
		setFontSize(option);
	};

	const handleSetFontColor = (option: OptionType) => {
		setFontColor(option);
	};

	const handleSetBackgroundColor = (option: OptionType) => {
		setBackgroundColor(option);
	};

	const handleSetContentWidth = (option: OptionType) => {
		setContentWidth(option);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={handleSetFontSize}
						title='Размер шрифта'
					/>

					<Select
						selected={fontColor}
						options={fontColors}
						onChange={handleSetFontColor}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={handleSetBackgroundColor}
						title='Цвет фона'
					/>

					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={handleSetContentWidth}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							onClick={() => {}}
							htmlType='reset'
							type='clear'
						/>
						<Button
							title='Применить'
							onClick={() => {}}
							htmlType='submit'
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
