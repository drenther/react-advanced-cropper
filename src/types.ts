import { ComponentType, CSSProperties, ReactNode, Ref } from 'react';
import {
	CropperImage,
	CropperTransitions,
	AspectRatio,
	PartialTransforms,
	ExtensionOf,
	CoreSettings,
	ModifiersSettings,
	BivarianceConstraint,
	CropperState,
} from 'advanced-cropper/types';
import { DefaultSettings } from 'advanced-cropper/defaults';
import { CropperStateHook, CropperStateSettings } from './hooks/useCropperState';
import {
	AbstractCropperIntrinsicProps,
	AbstractCropperProps,
	AbstractCropperRef,
	AbstractCropperSettings,
	AbstractCropperSettingsProp,
} from './components/AbstractCropper';
import { FixedCropperSettings } from './components/FixedCropper';
import { CropperRef } from './components/Cropper';

export type StencilComponent = any;

export type CropperWrapperComponent = ComponentType<{
	cropper: any;
	loading: boolean;
	loaded: boolean;
	className?: string;
	style?: CSSProperties;
}>;

export interface CropperBackgroundProps {
	className?: string;
	ref: Ref<HTMLImageElement | HTMLCanvasElement>;
	image: CropperImage | null;
	state: CropperState | null;
	transitions?: CropperTransitions;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
}

export type CropperBackgroundComponent = any;

export type CropperBackgroundWrapperComponent = ComponentType<{
	cropper: any;
	touchMove?: boolean;
	mouseMove?: boolean;
	touchScale?: boolean;
	touchRotate?: boolean;
	wheelScale?:
		| boolean
		| {
				ratio: number;
		  };
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}>;

export interface TransitionsSettings {
	timingFunction?: string;
	duration?: number;
}

export interface ScaleImageSettings {
	touch?: boolean;
	wheel?:
		| boolean
		| {
				ratio?: number;
		  };
	adjustStencil?: boolean;
}

export type StencilOptions = Record<string, unknown>;

export type StencilConstraints<Settings extends {}> = (
	settings: Settings,
	stencilOptions: StencilOptions,
) => Partial<Settings>;

export interface RotateImageSettings {
	touch?: boolean;
}

export interface MoveImageSettings {
	touch?: boolean;
	mouse?: boolean;
}

export type CustomCropperProps<Settings extends CustomCropperSettings> = AbstractCropperIntrinsicProps<Settings> &
	Partial<Pick<Settings, keyof CustomCropperSettings>> &
	Omit<Settings, keyof CustomCropperSettings>;

export type CustomCropperRef<Settings extends CustomCropperSettings> = AbstractCropperRef<Settings>;

export type CustomCropperSettings = AbstractCropperSettings;

export type DefaultTransforms = PartialTransforms | ((image: CropperImage) => PartialTransforms);

export type Nullable<T> = T | null | undefined;

export interface StencilRef {
	aspectRatio: () => AspectRatio;
}

export interface StencilProps<Cropper = CropperRef> {
	cropper: Cropper;
	image: CropperImage | null;
}

export type ArbitraryProps = Record<string, unknown>;