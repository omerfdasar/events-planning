import { Input, Modal, DatePicker, Select,Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

const CollectionCreateForm = ({ visible, onCreate, onCancel, record }) => {
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
          initialValue={record.title}
          rules={[
            {
              required: true,
              message: "Please type title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Type"
          label="Type"
          initialValue={record.type}
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
          initialValue={[moment(record.startDate), moment(record.endDate)]}
        >
          <DatePicker.RangePicker
            style={{
              width: "70%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Description"
          initialValue={record.description}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UpdateForm = ({ editEvents, record }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);

    let newEvent = {
      id: record.id,
      title: values.title,
      type: values.Type,
      startDate: moment(values.Date[0]).format("YYYY-MM-DD"),
      endDate: moment(values.Date[1]).format("YYYY-MM-DD"),
      description: values.Description,
    };

    editEvents(newEvent);
    setVisible(false);
  };

  return (
    <div>
      <EditOutlined
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      />
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        record={record}
      />
    </div>
  );
};

export default UpdateForm;
