import React from 'react';

import { Box } from '@mui/material';
import { ModalContainer, ModalPaper, ModalTitle } from './styles';

export default function AnimatedModal(props) {
    const handleClose = () => {
       props.onClose();
    };
    return (
        <div>
            <ModalContainer
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open}
                onClose={handleClose}
                closeAfterTransition

            >
                <Box>
                    <ModalPaper width={props.width}>
                        {props.children}
                    </ModalPaper>
                </Box>
            </ModalContainer>
        </div>
    );
}