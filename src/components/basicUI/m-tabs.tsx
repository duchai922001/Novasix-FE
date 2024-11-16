import { Tabs, TabsProps } from "antd";

interface ITabsProps extends TabsProps {
  items: TabsProps["items"];
  onChange: (key: string) => void;
}
const Mtabs: React.FC<ITabsProps> = ({ items, onChange }) => {
  return (
    <div className="m-tabs-normal">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default Mtabs;
