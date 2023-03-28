import { Button } from '@mui/material';
import React from 'react';
import ImageUploading from 'react-images-uploading';
import { DeleteIcon, UpdateIcon, UploadIcon } from '../../../constantes/icons';
import { ImageUploadingContent, ImageUploadingImg, ImageUploadingWrapper } from './styles';


const CustomImageUploading = (props) => {
    return (
        <ImageUploading
            multiple
            value={props.images}
            onChange={props.onChange}
            maxNumber={props.maxNumber}
            maxFileSize={6291456}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                errors
            }) => (
                // write your building UI
                <ImageUploadingWrapper>
                    {imageList.length > 0 ||
                        <div className='errorContainer'>
                            <Button
                                className='btn btn-primary-alt fa-2x'
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}>
                                <UploadIcon /> Subir foto
                            </Button>
                        </div>
                    }
                    &nbsp;
                    {imageList.map((image, index) => (
                        <ImageUploadingContent key={index}>
                            <ImageUploadingImg src={image['data_url']} />
                            <div>
                                <Button
                                    className='btn btn-info-alt fa-2x'
                                    onClick={() => onImageUpdate(index)}>
                                    <UpdateIcon /> Cambiar
                                </Button>
                                <Button
                                    className='btn btn-danger-alt fa-2x'
                                    onClick={() => {onImageRemove(index);}}>
                                    <DeleteIcon /> Quitar
                                </Button>
                            </div>
                        </ImageUploadingContent>
                    ))}

                    <div className='errorContainer'>
                        {errors && <div>
                            {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
                            {errors.acceptType && <span>Your selected file type is not allow</span>}
                            {errors.maxFileSize && <span className='errorMessage'>El tamaño de la foto es demasiado grande (Máximo 6MB)</span>}
                            {errors.resolution && <span>Selected file is not match your desired resolution</span>}
                        </div>
                        }
                    </div>

                </ImageUploadingWrapper>
            )}


        </ImageUploading>
    )
}

export default CustomImageUploading