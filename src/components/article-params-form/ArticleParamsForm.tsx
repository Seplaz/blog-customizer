import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	formParams: ArticleStateType;
	onChange: (newParams: Partial<ArticleStateType>) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formParams,
	onChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onClose: () => setSidebarOpen(false),
		onChange: setSidebarOpen,
	});

	const handleToggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						onApply();
					}}
					onReset={(event) => {
						event.preventDefault();
						onReset();
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formParams.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => onChange({ fontFamilyOption: option })}
						title='Шрифт'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formParams.fontSizeOption}
						onChange={(option) => onChange({ fontSizeOption: option })}
						title='Размер шрифта'
					/>

					<Select
						selected={formParams.fontColor}
						options={fontColors}
						onChange={(option) => onChange({ fontColor: option })}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formParams.backgroundColor}
						options={backgroundColors}
						onChange={(option) => onChange({ backgroundColor: option })}
						title='Цвет фона'
					/>

					<Select
						selected={formParams.contentWidth}
						options={contentWidthArr}
						onChange={(option) => onChange({ contentWidth: option })}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
