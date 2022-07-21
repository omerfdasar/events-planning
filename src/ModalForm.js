import { Button, Form, Input, Modal, Radio, DatePicker, Select } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
const { Option } = Select;
const { TextArea } = Input;

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create Event"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input /* showCount maxLength={50} */ />
        </Form.Item>
        <Form.Item
          name="Type"
          label="Type"
          rules={[
            {
              required: true,
              message: "Please input the type",
            },
          ]}
        >
          <Select defaultValue="Option1">
            <Option value="generic">Generic</Option>
            <Option value="holiday">Holiday</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Date"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please input the date",
            },
          ]}
        >
          <DatePicker.RangePicker
            style={{
              width: "70%",
            }}
          />
        </Form.Item>
        <Form.Item name="Description" label="Description">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const App = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Create Event
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default App;
