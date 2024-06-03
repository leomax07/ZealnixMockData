import { ReactElement } from "react";
import { FilePicker } from "evergreen-ui";
import { postRequest } from "../../utils/commonService";
import { API } from "../../constants";

interface Props {
  name?: string;
  label?: string;
  subText?: string;
  placeholder?: string;
  onChange?: (args: any) => void;
  multiple?:boolean
}

export default function FileUploadComponent({
  label,
  subText,
  onChange,
  placeholder,
  name,
  multiple
}: Props): ReactElement {
  const handleUpload = async (files: any) => {
    const formData = new FormData();
    for (let index = 0; index < files.length; index += 1) {
      formData.append("file", files[index]);
    }
    try {
      const { data } = await postRequest(API.FILES, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (onChange)
        onChange({
          target: {
            name,
            value: data,
          },
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="file__upload__container">
      <label>{label}</label>
      <div className="info__text">{subText}</div>

      <FilePicker
        name={name}
        multiple={multiple}
        width={250}
        onChange={handleUpload}
        placeholder={placeholder || "Select the file here!"}
      />
    </div>
  );
}
