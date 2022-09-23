import multer from 'multer';

import FileController from '../../app/controllers/FileController';
import uploadFile from '../../config/uploads/uploadFile';
import uploadImg from '../../config/uploads/uploadImg';

// import NOME from '../../app/Roles/NOME';

const fileUpload = multer(uploadFile);
const ImgUpload = multer(uploadImg);

export default (routes, auth) => {
  // Routes Public

  // Routes Private

  routes.post(
    '/api/v1/upload/file',
    auth,
    fileUpload.single('file'),
    FileController.uploadFile
  );

  routes.post(
    '/api/v1/upload/img',
    auth,
    ImgUpload.single('img'),
    FileController.uploadImg
  );
};
