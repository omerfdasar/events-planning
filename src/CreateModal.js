import { Button, Form, Input, Modal, DatePicker, Select } from "antd";
import { useState } from "react";
import moment from "moment";
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
        initialvalues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please type title of collection!",
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
              message: "Please select a type",
            },
          ]}
        >
          <Select initialvalues="generic">
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
              message: "Please type date",
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

const CreateForm = ({ addEvents }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);

    let newEvent = {
      title: values.title,
      type: values.Type,
      startDate: moment(values.Date[0]).format("YYYY-MM-DD"),
      endDate: moment(values.Date[1]).format("YYYY-MM-DD"),
      description: values.Description,
    };

    addEvents(newEvent);
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

export default CreateForm;
