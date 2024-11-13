import MButton from "@/components/basicUI/m-button";
import MCard from "@/components/basicUI/m-card";
import MCheckbox from "@/components/basicUI/m-checkbox";
import MDatePicker from "@/components/basicUI/m-datepicker";
import MInput from "@/components/basicUI/m-input";
import MTodo from "@/components/basicUI/m-todo";
import { InputTypes } from "@/constants/inputTypes.constant";
import { TodoStatusTypes } from "@/constants/todo.constant";
import { Col, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";

interface IFormWeekly {
  title: string;
  type: InputTypes;
  placeholder?: string;
}
const Weekly = () => {
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const formWeekly: IFormWeekly[] = [
    {
      title: "Checkin",
      type: InputTypes.TEXT,
      placeholder: "How did  I feel this week?",
    },
    {
      title: "Success",
      type: InputTypes.TEXT,
      placeholder: "What am I proud of?",
    },
    {
      title: "Lesson",
      type: InputTypes.TEXT,
      placeholder: "What did I learn?",
    },
    {
      title: "Future",
      type: InputTypes.TEXT,
      placeholder: "How can I improve next week?",
    },
    {
      title: "Space for more reflection",
      type: InputTypes.TEXTAREA,
      placeholder: "Highlight of the week...",
    },
    {
      title: "Make sure to check this week's Weekly Planning!",
      type: InputTypes.CHECKBOX,
    },
    {
      title: "Make sure to check the Monthly Planning!",
      type: InputTypes.CHECKBOX,
    },
  ];
  const onChangeCondition = (e: CheckboxChangeEvent, value: string) => {
    setSelectedCondition((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const renderFormWeekly = (item: IFormWeekly) => {
    switch (item.type) {
      case InputTypes.TEXT:
        return (
          <MInput
            title={item.title}
            type={InputTypes.TEXT}
            placeholder={item.placeholder}
          />
        );

      case InputTypes.TEXTAREA:
        return (
          <MInput
            title={item.title}
            type={InputTypes.TEXTAREA}
            placeholder={item.placeholder}
          />
        );
      case InputTypes.CHECKBOX:
        return (
          <MCheckbox
            title={item.title}
            value={selectedCondition.includes(item.title)}
            onChange={onChangeCondition}
          />
        );
    }
  };
  const onChange = () => {};
  return (
    <div className="weekly-view">
      <Row className="full-width" gutter={[12, 12]}>
        <Col span={24}>
          <MDatePicker onChange={onChange} />
        </Col>
        <Col span={24} className="todo-container">
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <MTodo
                title="Important - Not Urgent"
                action={TodoStatusTypes.IMPORTANT_NOT_URGENT}
              />
            </Col>
            <Col span={12}>
              <MTodo
                title="Important - Urgent"
                action={TodoStatusTypes.IMPORTANT_URGENT}
              />
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <MTodo
                title="Not Important - Urgent"
                action={TodoStatusTypes.NOT_IMPORTANT_URGENT}
              />
            </Col>
            <Col span={12}>
              <MTodo
                title="Not Important - Not Urgent"
                action={TodoStatusTypes.NOT_IMPORT_NOT_URGENT}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} className="weekly-reflection">
          <MCard
            title="Weekly reflection"
            renderContent={() => (
              <>{formWeekly.map((item) => renderFormWeekly(item))}</>
            )}
            styleContent={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            renderAction={() => (
              <Row className="action-container">
                <Col span={6} className="action-item">
                  <MButton title="Edit" border="circle" />
                </Col>
                <Col span={6} className="action-item">
                  <MButton title="Save" type="fill" border="circle" />
                </Col>
              </Row>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Weekly;
