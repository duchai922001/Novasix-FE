import Mtabs from "@/components/basicUI/m-tabs";
import { TabsProps } from "antd";
import MyAccount from "./my-account.view";
import Password from "./password.view";
import Billings from "./billings.view";
import Notifications from "./notifications.view";
import Authentication from "./authentication.view";

const Setting = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "My Account",
      children: <MyAccount />,
    },
    {
      key: "2",
      label: "Password",
      children: <Password />,
    },
    {
      key: "3",
      label: "Billings",
      children: <Billings />,
    },
    {
      key: "4",
      label: "Authentication",
      children: <Authentication />,
    },
    {
      key: "5",
      label: "Notifications",
      children: <Notifications />,
    },
  ];
  return (
    <div>
      <Mtabs items={items} onChange={(key) => console.log(key)} />
    </div>
  );
};

export default Setting;
