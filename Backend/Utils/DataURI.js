import datauriParser from "datauri/parser.js"
import path from "path"
const parser = new datauriParser()
const getDataUri = (file)=>{
    const extName = path.extname(File.originalname).toString();
    return parser.format(extName,file.buffer).content;

};
export default getDataUri