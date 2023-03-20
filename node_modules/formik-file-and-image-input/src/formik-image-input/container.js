import React from "react";
import { useFormikContext } from "formik";
import ImageInputComponent from "./component.js";

const universalImageFormats = [
	"image/png",
	"image/svg+xml",
	"image/jpeg",
	"image/gif",
	"image/bmp",
	"image/tiff",
	"image/webp",
];

export const ImageInput = ({
	component: Component,
	className,
	validFormats = universalImageFormats,
	name,
	hideName,
	hideError,
	hideDelete,
	hideEdit,
}) => {
	const {
		values,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		setFieldError,
	} = useFormikContext();
	const [imageUrl, setImageUrl] = React.useState(null);
	const inputRef = React.useRef(null);

	const isFileValid = React.useCallback(
		(file) => {
			if (!validFormats.includes(file.type)) {
				setFieldValue(name, null);
				setTimeout(() => {
					setFieldError(
						name,
						`Invalid file format. Accepted formats are ${validFormats.join(
							", "
						)}`
					);
				}, 0);
				return false;
			}
			return true;
		},
		[validFormats]
	);

	const generateImageUrl = (image) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setImageUrl(e.target.result);
		};
		reader.readAsDataURL(image);
	};

	const handleImageUpload = (e) => {
		const image = e.target.files[0];
		setFieldTouched(name, true);
		if (isFileValid(image)) {
			setFieldValue(name, image);
			setFieldError(name, null);
			generateImageUrl(image);
		}
	};

	const handleImageDelete = React.useCallback(() => {
		setFieldValue(name, null);
		setFieldError(name, null);
		setImageUrl(null);
	}, []);

	const showInputWindow = React.useCallback(
		(e) => {
			inputRef.current.click();
			e.stopPropagation();
		},
		[inputRef]
	);

	const imageInputProps = {
		InputComponent: Component,
		className,
		handleChange: handleImageUpload,
		fileName: values[name] && values[name].name,
		showInputWindow,
		inputRef,
		imageUrl,
		handleImageDelete,
	};

	return (
		<div>
			<ImageInputComponent {...imageInputProps} />
			{!hideName && <p>{values[name] && values[name].name}</p>}
			{!hideError && touched[name] && <p>{errors[name]}</p>}
			{!hideEdit && (
				<button type="button" onClick={showInputWindow}>
					Edit
				</button>
			)}
			{!hideDelete && (
				<button type="button" onClick={handleImageDelete}>
					Delete
				</button>
			)}
		</div>
	);
};
