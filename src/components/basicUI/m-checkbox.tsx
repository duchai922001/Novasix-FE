import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
interface IMCheckboxProps {
  title?: string;
  onChange?: (e: CheckboxChangeEvent, todo: string) => void;
  value?: boolean;
  type?: string;
}
const MCheckbox: React.FC<IMCheckboxProps> = ({
  title = "Checkbox",
  onChange = () => {},
  value,
  type,
}) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    onChange(e, title);
  };
  return (
    <>
      <Checkbox
        onChange={handleChange}
        className="m-checkbox-normal"
        checked={value}
      >
        <span
          className={`m-checkbox-title `}
          style={
            type === "todo" && value ? { textDecoration: "line-through" } : {}
          }
        >
          {title}
        </span>
      </Checkbox>
    </>
  );
};

export default MCheckbox;
