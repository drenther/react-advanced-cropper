import React, { useState, useRef, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { Cropper, CropperRef } from 'react-advanced-cropper';
import { Navigation } from './components/Navigation';
import { Slider } from './components/Slider';
import { AdjustableImage } from './components/AdjustableImage';
import { Button } from './components/Button';
import { ResetIcon } from './icons/ResetIcon';
import './ImageEditor.scss';

export const ImageEditor = () => {
	const cropperRef = useRef<CropperRef>(null);

	const [src, setSrc] = useState(
		'/react-advanced-cropper/img/images/pexels-photo-4383577.jpeg',
	);

	const [mode, setMode] = useState('crop');

	const [adjustments, setAdjustments] = useState({
		brightness: 0,
		hue: 0,
		saturation: 0,
		contrast: 0,
	});

	const onChangeValue = (value: number) => {
		if (mode in adjustments) {
			setAdjustments((previousValue) => ({
				...previousValue,
				[mode]: value,
			}));
		}
	};

	const onReset = () => {
		setMode('crop');
		setAdjustments({
			brightness: 0,
			hue: 0,
			saturation: 0,
			contrast: 0,
		});
	};

	const onUpload = (blob: string) => {
		onReset();
		setMode('crop');
		setSrc(blob);
	};

	const onDownload = () => {
		if (cropperRef.current) {
			const newTab = window.open();
			if (newTab) {
				newTab.document.body.innerHTML = `<img src="${cropperRef.current.getCanvas()?.toDataURL()}"/>`;
			}
		}
	};

	const changed = Object.values(adjustments).some((el) => Math.floor(el * 100));

	const cropperEnabled = mode === 'crop';

	return (
		<div className={'image-editor'}>
			<div className="image-editor__cropper">
				<Cropper
					src={src}
					ref={cropperRef}
					stencilProps={{
						movable: cropperEnabled,
						resizable: cropperEnabled,
						lines: cropperEnabled,
						handlers: cropperEnabled,
						overlayClassName: cn(
							'image-editor__cropper-overlay',
							!cropperEnabled && 'image-editor__cropper-overlay--faded',
						),
					}}
					backgroundWrapperProps={{
						scaleImage: cropperEnabled,
						moveImage: cropperEnabled,
					}}
					backgroundComponent={AdjustableImage}
					backgroundProps={adjustments}
				/>
				{mode !== 'crop' && (
					<Slider className="image-editor__slider" value={adjustments[mode]} onChange={onChangeValue} />
				)}
				<Button
					className={cn('image-editor__reset-button', !changed && 'image-editor__reset-button--hidden')}
					onClick={onReset}
				>
					<ResetIcon />
				</Button>
			</div>
			<Navigation mode={mode} onChange={setMode} onUpload={onUpload} onDownload={onDownload} />
		</div>
	);
};
