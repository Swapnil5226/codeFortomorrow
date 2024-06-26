import * as multer from "multer";
import * as util from 'util';
// const baseUrl = '../upload/'

let storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, baseUrl);
  // },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});

const uploadFiles = multer({ storage: storage }).fields([
  { name: 'mortgage_statement_or_offer', maxCount: 1 },
  { name: 'tenancy_aggrement', maxCount: 1 },
  { name: 'building_insurance', maxCount: 1 },
  { name: 'gas_certificate', maxCount: 1 },
  { name: 'landlord_insurance', maxCount: 1 },
  { name: 'electrical_report', maxCount: 1 },
  { name: 'portable_appliance_testing', maxCount: 1 },
  { name: 'land_registration', maxCount: 1 },
  { name: 'term_of_business', maxCount: 1 },
  { name: 'monthly_statements', maxCount: 1 },

])

let uploadFileMiddleware = util.promisify(uploadFiles);
export default uploadFiles;