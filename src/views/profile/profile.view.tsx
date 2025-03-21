import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Input,
  Typography,
  Upload,
  message,
  Spin,
} from "antd";
import { EditOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { handleError } from "@/utils/catch-error";
import { UserService } from "@/services/user.service";
import Loader from "@/components/loading";
import axios from "axios";

const { Title, Text } = Typography;

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [avatarUser, setAvatarUser] = useState("");
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [fileList, setFileList] = useState([]);
  // Chỉnh sửa thông tin user
  const handleEdit = (field) => {
    setEditField(field);
    setTempValue(userInfo[field]);
  };

  const handleSave = async () => {
    // try {
    //   await UserService.updateInfoUser({ [editField]: tempValue });
    //   setUserInfo({ ...userInfo, [editField]: tempValue });
    //   setEditField(null);
    //   message.success("Cập nhật thành công!");
    // } catch (error) {
    //   handleError(error);
    // }
  };

  // Lấy thông tin user
  const asyncUserCurrent = async () => {
    try {
      setIsLoading(true);
      const response = await UserService.getUserCurrent();
      setUserInfo({
        name: response.name,
        email: response.email,
        phone: response.phone,
      });
      setAvatarUser(response.avatar);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    asyncUserCurrent();
  }, []);

  // Xử lý cập nhật avatar
  const handleAvatarChange = async ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[fileList.length - 1].originFileObj;
      setAvatarUser(URL.createObjectURL(file));
      setFileList(fileList);
    }
  };

  const handleSaveAvatar = async () => {
    try {
      if (fileList.length === 0) {
        message.warning("Vui lòng chọn ảnh trước khi cập nhật!");
        return;
      }

      const payloadImage = new FormData();
      fileList.forEach((file) => {
        payloadImage.append("image", file.originFileObj);
      });
      const responseThumbnail = await axios.post(
        "https://novasix-be.onrender.com/upload/single",
        payloadImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (responseThumbnail.status === 200) {
        await UserService.updateUser({ avatar: responseThumbnail.data.url });
        asyncUserCurrent();
        message.success("Cập nhật ảnh đại diện thành công");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Card className="profile-card">
          {/* Ảnh bìa */}
          <div className="cover-photo">
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleAvatarChange}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh đại diện</Button>
            </Upload>
            {fileList.length > 0 && (
              <Button
                style={{ marginLeft: "12px" }}
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSaveAvatar}
              >
                Lưu ảnh
              </Button>
            )}
          </div>

          {/* Ảnh đại diện & tên */}
          <div className="avatar-container">
            <Avatar size={100} src={avatarUser} />
            <Title level={3}>{userInfo.name}</Title>
          </div>

          {/* Thông tin cá nhân */}
          <div className="info-section">
            {Object.entries(userInfo).map(([key, value]) => (
              <div key={key} className="info-row">
                <Text strong className="info-label">
                  {key.replace(/([A-Z])/g, " $1")}
                </Text>
                {editField === key ? (
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="info-input"
                  />
                ) : (
                  <Text>{value}</Text>
                )}
                {editField === key ? (
                  <Button
                    type="link"
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(key)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Đăng xuất */}
          <div className="logout-section">
            <Button type="link" danger>
              Sign Out From All Devices
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default Profile;
