import React from "react";

const DefaultComponent = ({ passRef, hidden, onChange }) => (
	<input
		type="file"
		ref={passRef}
		onChange={onChange}
		style={hidden ? { display: "none" } : {}}
	/>
);

const ImageInput = ({
	InputComponent,
	className,
	handleChange,
	fileName,
	imageUrl,
	inputRef,
	showInputWindow,
	handleImageDelete,
}) => {
	const Component = React.memo(() => {
		if (InputComponent) {
			return (
				<div>
					<DefaultComponent hidden passRef={inputRef} onChange={handleChange} />
					<InputComponent
						fileName={fileName}
						src={imageUrl}
						onClick={showInputWindow}
						onDelete={handleImageDelete}
					/>
				</div>
			);
		}
		return <DefaultComponent passRef={inputRef} onChange={handleChange} />;
	});

	return (
		<div className={className}>
			<Component />
		</div>
	);
};

export default ImageInput;
