import React from "react";
import Image from 'next/image'
import {useState} from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#5542F6'),
    backgroundColor: '#5542F6',
    '&:hover': {
      backgroundColor: '#442ff7',
    },
}));

export default function ImageComponent({link, productInfo, setProductInfo}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    async function deleteImage(ev){
        const index = productInfo.images?.indexOf(link);
        const indexOfCom = link.indexOf(".com/");
        const fileName = link.substring(indexOfCom + 5);

        if(index > -1){
            const data = new FormData();
            data.append('fileName', fileName);
            await axios.post('/api/delete', data);
            await setProductInfo(productInfo.images.splice(index, 1));
            const _id = productInfo._id;
            const images = productInfo.images;
            await axios.put('/api/products', {images, _id});
        }

        handleClose();
    }

    return (
        <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
        <Image
            src={link.toString()}
            key={link.toString()}
            alt={link.toString()}
            height={200}
            width={100}
            onClick={handleClickOpen}
            className="rounded-lg"
        />
        {open && (
            <div>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <Image
                            src={link.toString()}
                            key={link.toString()}
                            alt={link.toString()}
                            width={600}
                            height={800}
                            className="rounded-lg"
                            onClick={handleClickOpen}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={deleteImage} variant="contained" color="error">
                            Delete
                        </Button>
                        <ColorButton autoFocus onClick={handleClose} variant="contained" >
                            Close
                        </ColorButton>
                    </DialogActions>
                </BootstrapDialog>
            </div>
        )}
        </div>
    );
}
