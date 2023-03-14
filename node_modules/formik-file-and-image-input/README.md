### Formik File and Image Input

## Documentation

### Installation

This component is a helper component for managing file and image inputs with Formik. It is only meant to be used inside Formik which have access to the useFormik hook. Use of these components outside of the Formik context will throw an error.

**npm**

```bash
npm install formik-file-and-image-input --save
```

**yarn**

```bash
yarn add formik-file-and-image-input
```

### Example

```js
import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { FileInput, ImageInput } from "formik-file-and-image-input/lib";

function CustomFileInputWrapper = ({onClick, fileName}) => {
    return (
        <div>
            <button onClick={onClick}>Choose File</button>
            <p>{fileName}</p>
        </div>
    )
}

function CustomImageInputWrapper = ({onClick, fileName, src}) => {
    return (
        <div onClick={onClick}>
            {!src && <button onClick={onClick}>Choose Image</button>}
            <img src={src} />
            <p>{fileName}</p>
        </div>
    )
}

export default function MyForm() {
	const fileFormats = ["application/pdf"];
	const imageFormats = ["image/png", "image/svg", "image/jpeg"];
	const initialValues = {
		file: null,
		image: null,
	};

	const validationSchema = yup.shape({
		file: yup.mixed().required(),
		image: yup.mixed().required(),
	});

	return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
			<Form>
                <FileInput
                    name="file"
                    validFormats={fileFormats}
                    component={CustomFileInputWrapper}
                />
                <ImageInput
                    name="image"
                    validFormats={imageFormats}
                    component={CustomImageInputWrapper}
                />
                <button type="submit">Submit</button>
			</Form>
		</Formik>
	);
}
```

## User guide

### FileInput props

| Prop name    | Description                                                                                                          | Default value           | Example values                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------- |
| name         | The name of the field as referenced in formik                                                                        | required                | `"file","image"`                                                                                         |
| validFormats | An array of valid MIME formats                                                                                       | required                | `['image/png', 'image/svg','application/pdf']`                                                           |
| component    | A custom styled component to handle the file upload. `onClick` and `fileName` props will be passed to this component | `<input type="file" />` | `Component({onClick, fileName}) => <div onClick={onClick}>{fileName ? fileName : "Choose a file"}</div>` |

### ImageInput props

| Prop name    | Description                                                                                                                | Default value                                                                                    | Example values                                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| name         | The name of the field as referenced in formik                                                                              | required                                                                                         | `"file","image"`                                                                                                                 |
| validFormats | An array of valid MIME formats                                                                                             | `['image/png','image/svg+xml', 'image/jpeg', 'image/gif','image/bmp','image/tiff','image/webp']` | `['image/png', 'image/svg','application/pdf']`                                                                                   |
| component    | A custom styled component to handle the file upload. `onClick`,`src` and `fileName` props will be passed to this component | `<input type="file" />`                                                                          | `Component({onClick, src, fileName}) => <div onClick={onClick}><img src={src} />{fileName ? fileName : "Choose an image"}</div>` |

## License

The MIT License.
